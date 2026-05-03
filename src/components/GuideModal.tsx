interface Props {
  onClose: () => void;
}

export default function GuideModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl my-4">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-3xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">📋 Google Sheet Setup Guide</h2>
              <p className="mt-1 text-green-100 text-sm">Bilkul free • No coding • 5 minute setup</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full w-9 h-9 flex items-center justify-center text-white font-bold text-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="font-bold text-gray-800">Google Sheet Banayein</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>sheets.google.com</strong> par jain aur naya sheet banayein. Naam dein: <code className="bg-gray-100 px-1 rounded">Menu</code>
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="font-bold text-gray-800">Column Headers Likhen (Row 1)</h3>
              <div className="mt-2 bg-gray-50 rounded-xl p-3 overflow-x-auto">
                <table className="text-xs min-w-max">
                  <thead>
                    <tr>
                      {['A','B','C','D','E','F','G','H','I','J','K','L'].map((col) => (
                        <th key={col} className="bg-blue-500 text-white px-2 py-1 text-center">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {['name','description','price','calories','portionSize','category','imageUrl','isAvailable','isSpecial','allergens','prepTime','rating'].map((h, i) => (
                        <td key={i} className="border border-gray-200 px-2 py-1 font-medium text-gray-700 whitespace-nowrap">{h}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="font-bold text-gray-800">Menu Items Bharein (Row 2 se)</h3>
              <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs space-y-1">
                <div className="grid grid-cols-2 gap-1">
                  <div><strong>name:</strong> Paratha with Egg</div>
                  <div><strong>price:</strong> 120</div>
                  <div><strong>calories:</strong> 450</div>
                  <div><strong>portionSize:</strong> 2 Parathas</div>
                  <div><strong>category:</strong> Breakfast</div>
                  <div><strong>isAvailable:</strong> TRUE</div>
                  <div><strong>isSpecial:</strong> FALSE</div>
                  <div><strong>rating:</strong> 4.8</div>
                </div>
                <div className="mt-2 text-gray-600">
                  <strong>category values:</strong> Breakfast | Morning Refreshment | Lunch | Evening Refreshment | Dinner
                </div>
                <div className="text-gray-600">
                  <strong>imageUrl:</strong> Google Drive public image link ya web image URL
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h3 className="font-bold text-gray-800">Sheet Public Karein</h3>
              <ol className="text-sm text-gray-600 mt-1 space-y-1 list-decimal list-inside">
                <li>File → Share → Publish to web</li>
                <li><strong>"Entire Document"</strong> select karein</li>
                <li><strong>"Web page"</strong> format chunein</li>
                <li><strong>"Publish"</strong> click karein</li>
              </ol>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
            <div>
              <h3 className="font-bold text-gray-800">Sheet ID Copy Karein</h3>
              <p className="text-sm text-gray-600 mt-1">Sheet URL mein se ID copy karein:</p>
              <div className="mt-2 bg-gray-800 text-green-400 rounded-xl p-3 text-xs font-mono overflow-x-auto">
                <span className="text-gray-500">docs.google.com/spreadsheets/d/</span>
                <span className="bg-yellow-400 text-gray-800 px-1 rounded">1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms</span>
                <span className="text-gray-500">/edit</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Yellow wala part apka Sheet ID hai</p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-9 h-9 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">6</div>
            <div>
              <h3 className="font-bold text-gray-800">File Mein ID Paste Karein</h3>
              <p className="text-sm text-gray-600 mt-1">
                <code className="bg-gray-100 px-1 rounded text-xs">src/googleSheets.ts</code> file mein:
              </p>
              <div className="mt-2 bg-gray-800 text-green-400 rounded-xl p-3 text-xs font-mono">
                <span className="text-gray-400">SHEET_ID: </span>
                <span className="text-yellow-300">'Apna-Sheet-ID-Yahan'</span>
              </div>
            </div>
          </div>

          {/* Image Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-800 flex items-center gap-2">
              <span>🖼️</span> Food Images Kaise Add Karein?
            </h3>
            <ol className="text-sm text-blue-700 mt-2 space-y-1 list-decimal list-inside">
              <li>Google Drive mein image upload karein</li>
              <li>Image par right-click → "Get link"</li>
              <li>"Anyone with link" permission dein</li>
              <li>Link se ID copy karein</li>
              <li>imageUrl column mein paste karein:<br/>
                <code className="bg-blue-100 text-xs px-1 rounded break-all">https://drive.google.com/uc?export=view&id=FILE_ID</code>
              </li>
            </ol>
          </div>

          {/* Update tip */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-800 flex items-center gap-2">
              <span>✅</span> Menu Update Karna Kitna Aasan!
            </h3>
            <p className="text-sm text-green-700 mt-1">
              Sheet mein koi bhi change karein → Save → App automatically update ho jayegi! 
              Koi coding nahi, koi build nahi. Bas sheet update karo! 🎉
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Samajh Gaya! 👍
          </button>
        </div>
      </div>
    </div>
  );
}
