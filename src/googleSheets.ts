import { MenuItem } from './types';

// =====================================================
// 🟢 GOOGLE SHEETS INTEGRATION
// =====================================================
// Apni Google Sheet ko PUBLIC karein aur SHEET ID
// neeche paste karein. Puri guide app ke andar hai.
// =====================================================

export const SHEET_CONFIG = {
  // Apni Google Sheet ka ID yahan paste karein
  // Example: https://docs.google.com/spreadsheets/d/[YAHAN-HAI-ID]/edit
  SHEET_ID: 'YOUR_GOOGLE_SHEET_ID_HERE',
  
  // Sheet ka naam (default: Sheet1)
  SHEET_NAME: 'Menu',
};

// Google Sheets Public CSV URL
const getSheetURL = () => {
  return `https://docs.google.com/spreadsheets/d/${SHEET_CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_CONFIG.SHEET_NAME}`;
};

// CSV se data parse karna
function parseGoogleSheetsData(jsonText: string): MenuItem[] {
  try {
    // Google's JSON format clean karna
    const cleanJson = jsonText.replace(/^.*?({.*}).*?$/s, '$1');
    const data = JSON.parse(cleanJson);
    
    if (!data.table || !data.table.rows) return [];
    
    const rows = data.table.rows;
    const items: MenuItem[] = [];
    
    // Row 0 = headers, skip karo
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row.c || !row.c[0] || !row.c[0].v) continue;
      
      const getVal = (idx: number, defaultVal: string | number | boolean = '') => {
        if (row.c[idx] && row.c[idx].v !== null && row.c[idx].v !== undefined) {
          return row.c[idx].v;
        }
        return defaultVal;
      };
      
      items.push({
        id: String(i),
        name: String(getVal(0, 'Unknown Item')),
        description: String(getVal(1, 'No description')),
        price: Number(getVal(2, 0)),
        calories: Number(getVal(3, 0)),
        portionSize: String(getVal(4, 'Standard')),
        category: getVal(5, 'Lunch') as MenuItem['category'],
        imageUrl: String(getVal(6, '/images/lunch.jpg')),
        isAvailable: getVal(7, 'TRUE') === true || String(getVal(7, 'TRUE')).toUpperCase() === 'TRUE',
        isSpecial: getVal(8, 'FALSE') === true || String(getVal(8, 'FALSE')).toUpperCase() === 'TRUE',
        allergens: String(getVal(9, 'None')),
        prepTime: String(getVal(10, '5 mins')),
        rating: Number(getVal(11, 4.5)),
      });
    }
    
    return items;
  } catch (error) {
    console.error('Sheet parse error:', error);
    return [];
  }
}

// Main fetch function
export async function fetchMenuFromSheet(): Promise<MenuItem[] | null> {
  if (SHEET_CONFIG.SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
    return null; // Demo mode
  }
  
  try {
    const url = getSheetURL();
    const response = await fetch(url);
    if (!response.ok) throw new Error('Sheet fetch failed');
    const text = await response.text();
    const items = parseGoogleSheetsData(text);
    return items.length > 0 ? items : null;
  } catch (error) {
    console.error('Google Sheets Error:', error);
    return null;
  }
}
