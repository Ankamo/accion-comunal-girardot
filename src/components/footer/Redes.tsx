type RedesProps = {
  whatsappUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  xUrl: string;
  tiktokUrl: string;
  threadsUrl: string;
  youtubeUrl: string;
};

export default function Redes({
  whatsappUrl,
  facebookUrl,
  instagramUrl,
  xUrl,
  tiktokUrl,
  threadsUrl,
  youtubeUrl,
}: RedesProps) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-2 text-[#19295A] dark:text-blue-200">
        Redes Sociales
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-base text-gray-700 dark:text-gray-200">
        {/* Columna 1 */}
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            {/* WhatsApp */}
            <svg width="22" height="22" fill="currentColor" className="text-green-400" viewBox="0 0 24 24">
              <path d="M12.004 2.003c-5.522 0-9.997 4.475-9.997 9.997 0 1.762.464 3.484 1.346 4.997l-1.41 5.164a1 1 0 0 0 1.225 1.225l5.164-1.41a9.953 9.953 0 0 0 4.997 1.346c5.522 0 9.997-4.475 9.997-9.997s-4.475-9.997-9.997-9.997zm0 18.001a7.96 7.96 0 0 1-4.073-1.146l-.29-.172-3.067.838.822-3.008-.178-.295a7.963 7.963 0 1 1 6.786 3.783zm4.396-5.607c-.24-.12-1.418-.699-1.637-.779-.219-.08-.379-.12-.539.12-.16.24-.619.779-.759.939-.14.16-.279.18-.519.06-.24-.12-1.013-.373-1.93-1.189-.714-.637-1.197-1.426-1.338-1.666-.14-.24-.015-.369.105-.489.108-.107.24-.279.36-.419.12-.14.16-.24.24-.399.08-.16.04-.299-.02-.419-.06-.12-.539-1.299-.739-1.779-.195-.468-.393-.406-.539-.414l-.459-.008c-.16 0-.419.06-.639.299-.22.24-.839.82-.839 2 .001 1.18.859 2.318.979 2.478.12.16 1.689 2.58 4.099 3.516.574.197 1.021.314 1.37.402.575.146 1.099.125 1.51.076.461-.055 1.418-.579 1.618-1.139.2-.56.2-1.04.14-1.139-.06-.1-.22-.16-.46-.28z" />
            </svg>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-blue-300">
              WhatsApp
            </a>
          </li>
          <li className="flex items-center gap-2">
            {/* Youtube */}
            <svg width="22" height="22" fill="currentColor" className="text-red-500" viewBox="0 0 24 24">
              <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.425 3.5 12 3.5 12 3.5s-7.425 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 8.147 0 12 0 12s0 3.853.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.575 20.5 12 20.5 12 20.5s7.425 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.853 24 12 24 12s0-3.853-.502-5.814zM9.545 15.568V8.432l6.545 3.568-6.545 3.568z" />
            </svg>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-blue-300">
              Youtube
            </a>
          </li>
          <li className="flex items-center gap-2">
            {/* Facebook */}
            <svg width="22" height="22" fill="currentColor" className="text-blue-400" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
            </svg>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-blue-300">
              Facebook
            </a>
          </li>
        </ul>
        {/* Columna 2 */}
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            {/* Threads */}
            <svg width="22" height="22" fill="currentColor" className="text-black dark:text-white" viewBox="0 0 40 40">
              <path d="M20 2C10.1 2 2 10.1 2 20s8.1 18 18 18 18-8.1 18-18S29.9 2 20 2zm0 33c-8.3 0-15-6.7-15-15S11.7 5 20 5s15 6.7 15 15-6.7 15-15 15zm2.7-10.7c1.2-.6 2.1-1.8 2.1-3.3 0-2.2-1.7-3.7-4.3-3.7h-3.2v2.7h3.2c1.1 0 1.6.5 1.6 1.2 0 .7-.5 1.2-1.6 1.2h-1.6v2.7h1.6c1.2 0 1.7.5 1.7 1.2 0 .7-.5 1.2-1.7 1.2h-3.2v2.7h3.2c2.6 0 4.3-1.5 4.3-3.7 0-1.5-.9-2.7-2.1-3.3z" />
            </svg>
            <a href={threadsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-blue-300">
              Threads
            </a>
          </li>
          <li className="flex items-center gap-2">
            {/* Instagram */}
            <svg width="22" height="22" fill="currentColor" className="text-pink-400" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.635.401 3.678 1.357 2.721 2.314 2.451 3.45 2.392 4.731 2.333 6.011 2.32 6.42 2.32 12c0 5.58.013 5.989.072 7.269.059 1.281.329 2.417 1.286 3.374.957.957 2.093 1.227 3.374 1.286C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.417-.329 3.374-1.286.957-.957 1.227-2.093 1.286-3.374.059-1.28.072-1.689.072-7.269 0-5.58-.013-5.989-.072-7.269-.059-1.281-.329-2.417-1.286-3.374C19.365.401 18.229.131 16.948.072 15.668.013 15.259 0 12 0z" />
              <path d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.324A4.162 4.162 0 1 1 16.162 12 4.162 4.162 0 0 1 12 16.162zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
            </svg>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-blue-300">
              Instagram
            </a>
          </li>
          <li className="flex items-center gap-2">
            {/* TikTok */}
            <svg width="22" height="22" fill="currentColor" className="text-black dark:text-white" viewBox="0 0 40 40">
              <path d="M29.5 13.2c-1.7 0-3.1-1.4-3.1-3.1V7.1h-3.2v16.2c0 2.1-1.7 3.8-3.8 3.8s-3.8-1.7-3.8-3.8 1.7-3.8 3.8-3.8c.2 0 .4 0 .6.1v-3.3c-.2 0-.4-.1-.6-.1-3.9 0-7.1 3.2-7.1 7.1s3.2 7.1 7.1 7.1 7.1-3.2 7.1-7.1v-6.2c1 .6 2.2.9 3.4.9h1.1v-3.2h-1.1z" />
            </svg>
            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-blue-300">
              TikTok
            </a>
          </li>
          <li className="flex items-center gap-2">
            {/* X */}
            <svg width="22" height="22" fill="currentColor" className="text-black dark:text-white" viewBox="0 0 1200 1227">
              <path d="M299 0h209l192 294 201-294h196L771 464l429 763H987L600 729l-374 498H29l414-553L0 0h299Zm104 143H225l350 527 400-527H872L600 525 403 143Zm601 1017-335-529-166 217-312 312h153l242-312 242 312h176Zm-904-41 312-312L97 82H60l340 1037Z" />
            </svg>
            <a href={xUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 dark:text-blue-300">
              X
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
