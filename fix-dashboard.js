const fs = require('fs');
const lines = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8').split('\n');

// Keep up to line 777 (0-indexed 776). My Card Widget starts at 778
const goodLines = lines.slice(0, 777);

const newBottom = `          {/* My Card Widget */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                My card
              </p>
              <button
                className="text-xs flex items-center gap-1"
                style={{ color: "#2d6a4f" }}
              >
                <Plus size={13} /> Add card
              </button>
            </div>
            {/* Card visual */}
            <div
              className="rounded-xl p-4 mb-3 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2d6a4f 0%, #52b788 100%)",
                minHeight: 110,
              }}
            >
              <div className="absolute top-3 right-3">
                <svg width="40" height="28" viewBox="0 0 40 28">
                  <circle cx="15" cy="14" r="12" fill="rgba(255,255,255,0.3)" />
                  <circle
                    cx="25"
                    cy="14"
                    r="12"
                    fill="rgba(255,255,255,0.15)"
                  />
                </svg>
              </div>
              <p className="text-xs text-white/70 font-medium mb-6">
                Debit card
              </p>
              <p className="text-white font-mono text-sm tracking-widest">
                •••• •••• 7890
              </p>
              <div className="flex justify-between mt-3">
                <p className="text-xs text-white/70">User</p>
                <p className="text-xs text-white/70">03/28</p>
              </div>
            </div>
            {/* Quick actions */}
            <div className="grid grid-cols-4 gap-1 mb-3">
              {["Topup", "Send", "Request", "History"].map((a) => (
                <button
                  key={a}
                  className="flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-medium transition-colors"
                  style={{ backgroundColor: "#f4f5f7", color: "#6b7280" }}
                >
                  <Wallet size={14} />
                  {a}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Goal Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                Goal tracker
              </p>
              <button
                className="text-xs flex items-center gap-1"
                style={{ color: "#2d6a4f" }}
              >
                <Plus size={13} /> Add goals
              </button>
            </div>
            <p
              className="text-xs font-medium mb-3"
              style={{ color: "#9ca3af" }}
            >
              This year
            </p>
            <div className="space-y-3">
              {goals.map((g) => {
                const pct = (g.currentAmount / g.targetAmount) * 100;
                return (
                  <div key={g.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span
                        className="font-medium"
                        style={{ color: "#111827" }}
                      >
                        {g.title}
                      </span>
                      <span style={{ color: "#9ca3af" }}>
                        ₹{g.currentAmount.toLocaleString("en-IN")} / ₹
                        {g.targetAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ backgroundColor: "#f3f4f6" }}
                    >
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{ width: \`\${pct}%\`, backgroundColor: "#2d6a4f" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                Transaction history
              </p>
              <select
                className="text-xs border rounded-lg px-2 py-1"
                style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
              >
                <option>7d</option>
              </select>
            </div>
            <div className="space-y-3">
              {transactions.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-medium truncate"
                      style={{ color: "#111827" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "#9ca3af" }}>
                      {t.date}
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold shrink-0"
                    style={{ color: t.pos ? "#22c55e" : "#ef4444" }}
                  >
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="w-full mt-3 text-xs font-medium py-2 rounded-xl flex items-center justify-center gap-1 transition-colors"
              style={{ backgroundColor: "#f4f5f7", color: "#6b7280" }}
            >
              View all <ChevronRight size={12} />
            </button>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
}
`;

goodLines.push(newBottom);
fs.writeFileSync('src/app/dashboard/page.tsx', goodLines.join('\n'));
