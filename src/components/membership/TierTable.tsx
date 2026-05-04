type TierTableProps = {
  title: string;
  eyebrow: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

export function TierTable({
  title,
  eyebrow,
  columns,
  rows,
  note,
}: TierTableProps) {
  return (
    <div style={{ marginTop: "clamp(48px, 6vw, 80px)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h3
          className="h-section"
          style={{
            margin: 0,
            fontSize: "clamp(22px, 2.4vw, 32px)",
            fontWeight: 400,
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {eyebrow}
        </span>
      </div>

      <div
        style={{ overflowX: "auto", border: "1px solid var(--rule-strong)" }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--sans)",
            fontSize: 14,
          }}
        >
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c}
                  style={{
                    textAlign: "left",
                    padding: "16px 20px",
                    fontWeight: 500,
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    borderBottom: "1px solid var(--rule-strong)",
                    background: "var(--bg)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: "20px 20px",
                      borderBottom:
                        ri === rows.length - 1
                          ? 0
                          : "1px solid var(--rule)",
                      color: ci === 0 ? "var(--ink)" : "var(--ink-2)",
                      fontFamily: ci === 0 ? "var(--serif)" : "var(--sans)",
                      fontSize: ci === 0 ? 17 : 14,
                      fontStyle:
                        ci === 0 && r[0] === "Founding" ? "italic" : "normal",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && (
        <div
          style={{
            marginTop: 14,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--muted)",
            textTransform: "uppercase",
          }}
        >
          {note.startsWith("*")
            ? `* Note · ${note.slice(1).trimStart()}`
            : `Note · ${note}`}
        </div>
      )}
    </div>
  );
}
