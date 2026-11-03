풍무동성당 PWA V1.3

- V1.1 안정 구조 유지
- 일반 브라우저에서는 설치 안내바를 HTML에서 즉시 표시
- 설치된 standalone 앱에서는 설치 안내바 자동 숨김
- 7일 숨김 기능 제거
- Chrome: beforeinstallprompt가 있으면 설치창 직접 호출
- Samsung Internet: 직접 호출이 안 되면 설치 위치 안내
- Service Worker 캐시명을 v4로 변경하여 이전 V1.2 캐시 갱신

적용:
저장소 루트에 전체 덮어쓰기 → Commit → Push
