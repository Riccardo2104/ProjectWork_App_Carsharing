export default function Legend() {
  const items = [
    { color: "#3B82F6", label: "Auto · Flotta" },
    { color: "#A855F7", label: "Auto · Privato" },
    { color: "#10B981", label: "Bici · Flotta" },
    { color: "#F59E0B", label: "Bici · Privato" },
  ];

  return (
    <div className="map-legend">
      {items.map((item) => (
        <div key={item.label} className="legend-item">
          <span className="legend-dot" style={{ background: item.color }} />
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
