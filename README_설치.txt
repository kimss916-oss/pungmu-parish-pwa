풍무동성당 PWA V1.2

변경사항
- V1.1 설치형 PWA 구조 유지
- 일반 사용자를 위한 '풍무동성당 앱 설치' 안내 추가
- Chrome: 설치 가능 시 페이지의 설치 버튼으로 설치창 호출
- Samsung Internet 등: 설치 버튼 호출이 불가능한 경우 브라우저별 간단 안내 표시
- 이미 독립 앱(standalone)으로 실행 중이면 설치 안내 표시 안 함
- 안내를 닫으면 7일 동안 다시 표시하지 않음
- Apps Script 로그인/세션 구조는 변경하지 않음

적용
1. 이 폴더의 index.html, manifest.webmanifest, sw.js를 GitHub 저장소 루트에 덮어쓰기
2. icons 폴더에는 기존 V1.1의 풍무동성당 icon-192.png / icon-512.png 유지
3. Commit to main → Push origin
