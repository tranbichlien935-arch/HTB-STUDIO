export default function KhaiTruongIllustration({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", ...style }}
    >
      {/* background gradient */}
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EEF4EC" />
          <stop offset="100%" stopColor="#D4E0D0" />
        </linearGradient>
        <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F4ACB7" />
          <stop offset="50%" stopColor="#F4A261" />
          <stop offset="100%" stopColor="#F4ACB7" />
        </linearGradient>
        <linearGradient id="storefront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#F5F0E8" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E9C46A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E9C46A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* bg */}
      <rect width="600" height="400" fill="url(#bg)" />
      <ellipse cx="300" cy="200" rx="260" ry="180" fill="url(#glow)" />

      {/* confetti dots */}
      {[
        [60,40,"#F4ACB7"],[120,70,"#E9C46A"],[500,50,"#A3B18A"],[540,90,"#F4A261"],
        [80,320,"#E9C46A"],[40,260,"#F4ACB7"],[560,300,"#A3B18A"],[520,350,"#F4A261"],
        [180,30,"#A3B18A"],[420,25,"#F4ACB7"],[160,370,"#F4A261"],[430,365,"#E9C46A"],
      ].map(([cx,cy,fill],i) => (
        <circle key={i} cx={cx as number} cy={cy as number} r={i%2===0?5:3.5} fill={fill as string} opacity="0.75" />
      ))}

      {/* floating balloons */}
      {/* balloon 1 - pink */}
      <ellipse cx="110" cy="130" rx="28" ry="36" fill="#F4ACB7" opacity="0.9" />
      <line x1="110" y1="166" x2="112" y2="210" stroke="#F4ACB7" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M110 165 Q118 172 110 178 Q102 172 110 165Z" fill="#F4ACB7" opacity="0.7" />
      <ellipse cx="102" cy="120" rx="7" ry="9" fill="white" opacity="0.35" />

      {/* balloon 2 - peach */}
      <ellipse cx="490" cy="110" rx="26" ry="33" fill="#F4A261" opacity="0.9" />
      <line x1="490" y1="143" x2="488" y2="188" stroke="#F4A261" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M490 142 Q498 149 490 155 Q482 149 490 142Z" fill="#F4A261" opacity="0.7" />
      <ellipse cx="482" cy="101" rx="6" ry="8" fill="white" opacity="0.35" />

      {/* balloon 3 - champagne */}
      <ellipse cx="160" cy="90" rx="20" ry="26" fill="#E9C46A" opacity="0.85" />
      <line x1="160" y1="116" x2="158" y2="150" stroke="#E9C46A" strokeWidth="1.5" strokeDasharray="3 2" />
      <ellipse cx="153" cy="82" rx="5" ry="6" fill="white" opacity="0.3" />

      {/* balloon 4 - sage */}
      <ellipse cx="448" cy="80" rx="22" ry="28" fill="#A3B18A" opacity="0.85" />
      <line x1="448" y1="108" x2="446" y2="145" stroke="#A3B18A" strokeWidth="1.5" strokeDasharray="3 2" />
      <ellipse cx="441" cy="72" rx="5" ry="7" fill="white" opacity="0.3" />

      {/* storefront */}
      <rect x="150" y="170" width="300" height="185" rx="4" fill="url(#storefront)" stroke="#D4E0D0" strokeWidth="1.5" />
      {/* awning */}
      <path d="M140 172 L460 172 L450 200 L150 200 Z" fill="#A3B18A" />
      {/* awning stripes */}
      {[170,200,230,260,290,320,350,380,410,440].map((x,i) => (
        <line key={i} x1={x} y1="172" x2={x-10} y2="200" stroke="rgba(255,255,255,0.25)" strokeWidth="8" />
      ))}
      {/* door */}
      <rect x="255" y="265" width="90" height="90" rx="45" fill="#EEF4EC" stroke="#A3B18A" strokeWidth="1.5" />
      <rect x="268" y="278" width="64" height="77" rx="32" fill="#F5F0E8" />
      <circle cx="316" cy="317" r="4" fill="#A3B18A" />
      {/* windows */}
      <rect x="165" y="215" width="80" height="65" rx="6" fill="#D4E0D0" opacity="0.7" stroke="#A3B18A" strokeWidth="1" />
      <line x1="205" y1="215" x2="205" y2="280" stroke="#A3B18A" strokeWidth="1" opacity="0.5" />
      <line x1="165" y1="247" x2="245" y2="247" stroke="#A3B18A" strokeWidth="1" opacity="0.5" />
      <rect x="355" y="215" width="80" height="65" rx="6" fill="#D4E0D0" opacity="0.7" stroke="#A3B18A" strokeWidth="1" />
      <line x1="395" y1="215" x2="395" y2="280" stroke="#A3B18A" strokeWidth="1" opacity="0.5" />
      <line x1="355" y1="247" x2="435" y2="247" stroke="#A3B18A" strokeWidth="1" opacity="0.5" />
      {/* sign */}
      <rect x="210" y="203" width="180" height="26" rx="4" fill="#344E41" />
      <text x="300" y="221" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#E9C46A" letterSpacing="2">KHAI TRƯƠNG</text>

      {/* ribbon across storefront */}
      <rect x="140" y="242" width="320" height="12" rx="6" fill="url(#ribbon)" />
      {/* ribbon shine */}
      <rect x="140" y="242" width="320" height="4" rx="3" fill="rgba(255,255,255,0.35)" />

      {/* scissors */}
      <g transform="translate(282,230) rotate(-25)">
        <ellipse cx="-12" cy="-8" rx="14" ry="5" fill="none" stroke="#344E41" strokeWidth="2" />
        <ellipse cx="12" cy="8" rx="14" ry="5" fill="none" stroke="#344E41" strokeWidth="2" />
        <line x1="-6" y1="-4" x2="6" y2="4" stroke="#344E41" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="-6" cy="-3" r="3" fill="#E9C46A" stroke="#344E41" strokeWidth="1.5" />
        <circle cx="6" cy="3" r="3" fill="#E9C46A" stroke="#344E41" strokeWidth="1.5" />
      </g>

      {/* ribbon bow left */}
      <path d="M160 248 Q140 235 130 248 Q140 258 160 248Z" fill="#F4ACB7" />
      <path d="M160 248 Q148 238 138 245" stroke="#F4ACB7" strokeWidth="1" fill="none" />
      {/* ribbon bow right */}
      <path d="M440 248 Q460 235 470 248 Q460 258 440 248Z" fill="#F4ACB7" />

      {/* flower clusters bottom corners */}
      {/* left flowers */}
      <circle cx="155" cy="358" r="14" fill="#F4ACB7" opacity="0.85" />
      <circle cx="135" cy="348" r="11" fill="#F4A261" opacity="0.8" />
      <circle cx="170" cy="345" r="10" fill="#E9C46A" opacity="0.8" />
      <circle cx="148" cy="340" r="8" fill="#F4ACB7" opacity="0.7" />
      <circle cx="158" cy="355" r="4" fill="#344E41" opacity="0.6" />
      <circle cx="140" cy="345" r="3" fill="#344E41" opacity="0.5" />
      {/* stems */}
      <line x1="155" y1="365" x2="150" y2="390" stroke="#588157" strokeWidth="2" />
      <line x1="138" y1="358" x2="132" y2="390" stroke="#588157" strokeWidth="2" />
      <path d="M152 378 Q144 370 148 362" stroke="#A3B18A" strokeWidth="1.5" fill="none" />

      {/* right flowers */}
      <circle cx="445" cy="358" r="14" fill="#A3B18A" opacity="0.85" />
      <circle cx="465" cy="348" r="11" fill="#F4ACB7" opacity="0.8" />
      <circle cx="430" cy="345" r="10" fill="#F4A261" opacity="0.8" />
      <circle cx="452" cy="340" r="8" fill="#E9C46A" opacity="0.7" />
      <circle cx="443" cy="355" r="4" fill="#344E41" opacity="0.6" />
      <circle cx="462" cy="345" r="3" fill="#344E41" opacity="0.5" />
      <line x1="445" y1="365" x2="450" y2="390" stroke="#588157" strokeWidth="2" />
      <line x1="462" y1="358" x2="468" y2="390" stroke="#588157" strokeWidth="2" />
      <path d="M448 378 Q456 370 452 362" stroke="#A3B18A" strokeWidth="1.5" fill="none" />

      {/* sparkles */}
      {[[300,155],[220,160],[380,158],[300,340]].map(([cx,cy],i) => (
        <g key={i} transform={`translate(${cx},${cy})`}>
          <line x1="-6" y1="0" x2="6" y2="0" stroke="#E9C46A" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#E9C46A" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="-4" y1="-4" x2="4" y2="4" stroke="#E9C46A" strokeWidth="1" strokeLinecap="round" />
          <line x1="4" y1="-4" x2="-4" y2="4" stroke="#E9C46A" strokeWidth="1" strokeLinecap="round" />
        </g>
      ))}

      {/* HBT Studio watermark */}
      <text x="300" y="393" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fill="#A3B18A" opacity="0.6" letterSpacing="3">
        HBT STUDIO
      </text>
    </svg>
  );
}
