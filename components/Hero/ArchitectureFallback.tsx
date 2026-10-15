import type { ArchitectureLayer } from "./architecture";

export function ArchitectureFallback({
  active,
}: {
  active: ArchitectureLayer;
}) {
  const color = (id: ArchitectureLayer) =>
    active === id ? "#c5f477" : "#7d9764";
  return (
    <svg
      className="architecture-fallback"
      viewBox="0 0 600 420"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M38 243 270 111 563 263 332 397Z"
        fill="#172219"
        stroke="#41533a"
      />
      <path
        d="m38 243 294 154v10L38 253Zm294 154 231-134v10L332 407Z"
        fill="#111a13"
        stroke="#35452f"
      />
      <g stroke="#293b29" strokeWidth="1">
        <path d="m90 213 293 154m-241-184 293 154m-241-184 293 154M97 274l232-132m-173 163 232-133m-173 164 232-134m-172 165 232-134" />
      </g>
      <path
        d="m153 270 74 39 87-50 76 39 68-39"
        stroke="#6d8c4d"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="227" cy="309" r="4" fill="#c5f477" />
      <circle cx="390" cy="298" r="4" fill="#c5f477" />
      <g>
        <path
          d="m70 255 106-61 95 49-106 61Z"
          fill="#263b29"
          stroke={color("frontend")}
        />
        <path
          d="m89 142 126-35 0 133-126 35Z"
          fill="#101a15"
          stroke={color("frontend")}
          strokeWidth="2"
        />
        <path
          d="m89 142 126-35 10 5v133l-10-5V107l-126 35Z"
          fill="#3f5539"
          stroke="#657d54"
        />
        <path d="m90 142 125-34v22l-125 34Z" fill="#31452d" />
        <g fill="#aacb7e">
          <circle cx="99" cy="151" r="2" />
          <circle cx="106" cy="149" r="2" />
          <circle cx="113" cy="147" r="2" />
        </g>
        <path d="m99 174 29-8v82l-29 8Z" fill="#253a29" />
        <path d="m139 163 62-17v6l-62 17Z" fill={color("frontend")} />
        <path d="m139 182 26-7v30l-26 7Zm35-10 27-7v30l-27 7Z" fill="#344c30" />
        <g stroke="#70875d" strokeWidth="3">
          <path d="m140 225 60-16m-60 26 42-12" />
        </g>
        <path d="m149 258 16-4v26l-16 4Z" fill="#526c43" />
      </g>
      <g>
        <path
          d="m249 222 59-35 81 42-60 35Z"
          fill="#2c432f"
          stroke={color("backend")}
        />
        <path
          d="m267 142 55-31 54 29-55 32Z"
          fill="#4b6240"
          stroke={color("backend")}
        />
        <path d="m267 142 54 30v105l-54-29Z" fill="#263e2c" stroke="#607650" />
        <path
          d="m321 172 55-32v105l-55 32Z"
          fill="#19291e"
          stroke={color("backend")}
        />
        <path
          d="m328 182 40-23v20l-40 23Zm0 30 40-23v20l-40 23Zm0 30 40-23v20l-40 23Z"
          fill="#344d32"
        />
        <g fill={color("backend")}>
          <circle cx="359" cy="177" r="2" />
          <circle cx="359" cy="207" r="2" />
          <circle cx="359" cy="237" r="2" />
        </g>
      </g>
      <g>
        <path
          d="m394 253 62-36 66 34-63 37Z"
          fill="#29402b"
          stroke={color("database")}
        />
        <path
          d="M415 218v27c0 11 80 11 80-12v-27Z"
          fill="#263f2c"
          stroke="#6a8255"
        />
        <ellipse
          cx="455"
          cy="218"
          rx="40"
          ry="17"
          fill="#3a5536"
          stroke={color("database")}
        />
        <path
          d="M415 186v27c0 22 80 22 80-1v-26Z"
          fill="#243c2b"
          stroke="#6a8255"
        />
        <ellipse
          cx="455"
          cy="186"
          rx="40"
          ry="17"
          fill="#3b5636"
          stroke={color("database")}
        />
        <path
          d="M415 154v27c0 22 80 22 80-1v-26Z"
          fill="#2a4430"
          stroke="#6a8255"
        />
        <ellipse
          cx="455"
          cy="154"
          rx="40"
          ry="17"
          fill="#4c663e"
          stroke={color("database")}
          strokeWidth="2"
        />
        <ellipse cx="455" cy="154" rx="25" ry="10" stroke="#849f68" />
      </g>
    </svg>
  );
}
