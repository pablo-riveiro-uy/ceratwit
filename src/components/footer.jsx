import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo" aria-label="Pie de página">
      <div className="footer-content">
        <p className="footer-text">
          © {year} <span className="footer-brand">4S PRODUCCIONES</span> · CERATWIT
        </p>
      </div>
    </footer>
  );
}
