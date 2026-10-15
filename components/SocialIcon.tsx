import type { ContactChannelId } from "@/lib/site";

// Local SVG drawings; Flaticon animated icons serve as a motion reference only.
export function SocialIcon({ channel }: { channel: ContactChannelId }) {
  return (
    <svg
      className={`social-icon social-icon--${channel}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {channel === "instagram" && (
        <g className="social-symbol">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle className="social-detail" cx="12" cy="12" r="4" />
          <circle
            className="social-dot"
            cx="17.5"
            cy="6.5"
            r="0.9"
            fill="currentColor"
            stroke="none"
          />
        </g>
      )}
      {channel === "linkedin" && (
        <g className="social-symbol">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <g className="social-detail">
            <path d="M7.5 10.5v6M11.5 16.5v-6m0 2.5c0-3.5 5-3.5 5 0v3.5" />
          </g>
          <circle
            className="social-dot"
            cx="7.5"
            cy="7.5"
            r="1"
            fill="currentColor"
            stroke="none"
          />
        </g>
      )}
      {channel === "github" && (
        <g className="social-symbol">
          <path d="M8.5 21v-3c0-.7.2-1.3.5-1.8-3.8-.5-6-2.1-6-5.4 0-1.3.5-2.5 1.4-3.5L4 3.5C5.6 3.5 7 4.2 8.1 5a13 13 0 0 1 7.8 0C17 4.2 18.4 3.5 20 3.5l-.4 3.8a5 5 0 0 1 1.4 3.5c0 3.3-2.2 4.9-6 5.4.3.5.5 1.1.5 1.8v3" />
          <path
            className="social-detail"
            d="M8.5 18.5c-3.4 1-4.2-1.1-4.8-2.1-.4-.7-.9-1-1.7-1"
          />
        </g>
      )}
      {channel === "email" && (
        <g className="social-symbol">
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path className="social-detail" d="m4 7 8 6 8-6" />
        </g>
      )}
    </svg>
  );
}
