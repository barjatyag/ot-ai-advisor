{result && (
  <div style={styles.resultBox}>
    <h3>📊 Analysis Report</h3>

    <div style={styles.section}>
      <strong>🎯 Risk Score</strong>
      <p>{result.split("Findings:")[0]}</p>
    </div>

    <div style={styles.section}>
      <strong>🔍 Findings</strong>
      <p>{result.split("Findings:")[1]?.split("Risks:")[0]}</p>
    </div>

    <div style={styles.section}>
      <strong>⚠️ Risks</strong>
      <p>{result.split("Risks:")[1]?.split("Recommendations:")[0]}</p>
    </div>

    <div style={styles.section}>
      <strong>✅ Recommendations</strong>
      <p>{result.split("Recommendations:")[1]}</p>
    </div>
  </div>
)}
