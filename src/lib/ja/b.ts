const b: Record<string, string> = {
  // quality page
  "Back to home": "ホームに戻る",
  "Quality, in numbers.": "数字で見る品質。",
  "Every number on this page is counted from the real repository it names, and the \"not tested yet\" lists are kept on purpose: a tester who hides gaps is not a tester you want.":
    "このページの数字はすべて、記載したリポジトリから実際に数えたものです。「未テストの範囲」を残しているのは意図的です。穴を隠すテスターは、一緒に働きたいテスターではないからです。",
  "Test coverage per project": "プロジェクト別のテストカバレッジ",
  unit: "単体",
  "API / contract": "API/コントラクト",
  "end to end": "E2E",
  manual: "手動",
  "{label}{n}": "{label}{n}件",
  "Not tested yet: ": "未テストの範囲：",
  "F1 public APIs (Postman)": "F1公開API（Postman）",
  "SauceDemo (manual sample)": "SauceDemo（手動テストのサンプル）",
  "Every push in GitHub Actions (lint, typecheck, unit, contract, e2e)": "プッシュのたびにGitHub Actionsで実行（lint、型チェック、単体、コントラクト、E2E）",
  "Every push in GitHub Actions (lint, typecheck, unit, build)": "プッシュのたびにGitHub Actionsで実行（lint、型チェック、単体、ビルド）",
  "Every push in GitHub Actions, against the deployed app": "プッシュのたびにGitHub Actionsで、デプロイ済みのアプリに対して実行",
  "In the ShelfSeeker E2E repo, desktop and mobile emulation, every push": "ShelfSeeker E2Eリポジトリで、デスクトップとモバイルエミュレーションの両方を、プッシュのたびに実行",
  "Newman in GitHub Actions, 41 assertions across 13 requests": "GitHub ActionsでNewmanを実行。13リクエスト、41アサーション",
  "flutter analyze and 6 login-page widget tests in GitHub Actions on every push; Maestro smoke flows run locally against a device":
    "プッシュのたびにGitHub Actionsでflutter analyzeとログイン画面のウィジェットテスト6件を実行。Maestroのスモークフローは実機/エミュレータ上でローカル実行",
  "24 designed cases; 11 re-executed live on 18 Oct 2026, 4 bugs filed": "設計済み24ケース。うち11ケースを2026年10月18日に再実行し、バグ4件を報告",
  "Push notification delivery on real devices": "実機でのプッシュ通知の配信",
  "Rate-limit behaviour under live provider throttling": "提供元の実際のレート制限がかかった状態での動作",
  "End-to-end UI flows (no Playwright suite yet)": "UIのE2Eフロー（Playwrightのスイートはまだありません）",
  "Push delivery end to end": "プッシュ配信のE2E",
  "The live FIRMS path with a real API key": "実際のAPIキーを使ったFIRMSのライブ経路",
  "Map tile interactions": "地図タイルの操作",
  "No unit tests yet": "単体テストはまだありません",
  "Alert sound": "アラート音",
  "Provider failure states": "提供元の障害時の挙動",
  "Firebase auth failure paths": "Firebase認証の失敗パターン",
  "Barcode scanner on real devices": "実機でのバーコードスキャナー",
  "Load and rate-limit behaviour": "負荷時とレート制限時の動作",
  "Most UI flows": "ほとんどのUIフロー",
  "Maestro flows in CI (they need an emulator or device)": "CIでのMaestroフロー（エミュレータまたは実機が必要）",
  "Live API checks": "ライブAPIチェック",
  "The same style of assertions I write in Postman, executed right now from your browser against the public USGS earthquake feed that powers QuakeWatch. Nothing here is cached or staged.":
    "Postmanで書いているのと同じ形式のアサーションを、QuakeWatchが使っているUSGSの公開地震フィードに対して、今この場でお使いのブラウザから実行します。キャッシュや仕込みは一切ありません。",
  "Trigger a real CI run": "実際のCIを実行する",
  "Bugs I found and fixed in my own projects": "自分のプロジェクトで見つけて直したバグ",
  "A tester's own code should not get a free pass. Each entry links the real fix commit.":
    "テスターが書いたコードも、特別扱いはしません。各項目に、実際の修正コミットへのリンクを付けています。",
  "Fix commit": "修正コミット",
  "22 Oct 2026": "2026年10月22日",
  "Audit could clear a server that was never patched": "パッチ未適用のサーバーを「安全」と判定しかけた監査ツール",
  "The scanner credited any installed php* package as a fix, so a host running a self-compiled PHP could be reported patched when it was not, the worst verdict a security tool can give. The probe now tracks which package owns each binary, an incomplete inventory can never produce an overall patched verdict, and redirects, timeouts and empty logs fail safe. Verified with 41 tests.":
    "インストール済みの php* パッケージがあれば修正済みとみなしていたため、独自ビルドのPHPを使うホストを、未修正なのに「修正済み」と報告するおそれがありました。セキュリティツールにとって最悪の誤判定です。プローブは各バイナリを所有するパッケージを追跡するようになり、インベントリが不完全な場合は全体として修正済みの判定を出さず、リダイレクト、タイムアウト、空のログも安全側に処理します。41件のテストで検証済みです。",
  "16 Oct 2026": "2026年10月16日",
  "17 Oct 2026": "2026年10月17日",
  "18 Oct 2026": "2026年10月18日",
  "Production crash on the FIRMS proxy": "FIRMSプロキシの本番環境でのクラッシュ",
  "The province-boundary import worked locally but crashed the deployed serverless function with FUNCTION_INVOCATION_FAILED. Found it by hitting the live endpoint, fixed by inlining the geometry.":
    "州境界データのインポートはローカルでは動きましたが、デプロイ済みのサーバーレス関数ではFUNCTION_INVOCATION_FAILEDでクラッシュしました。本番のエンドポイントを直接叩いて発見し、ジオメトリをコード内に埋め込んで修正しました。",
  "Push notifications silently never worked": "プッシュ通知が、気づかれないまま一度も動いていなかった",
  "The env parsing read the wrong variable names, so the VAPID keys were always undefined and every push setup quietly failed. Found while wiring the notification flow, fixed at the parser.":
    "環境変数の読み込み処理が間違った変数名を参照していたため、VAPIDキーが常に未定義になり、プッシュ通知の設定がすべて静かに失敗していました。通知フローをつないでいる最中に見つけ、パーサーを直して解決しました。",
  "Team badges invisible in light theme": "ライトテーマでチームのバッジが見えない",
  "White-on-transparent badge artwork disappeared on the light background. Rendered them on a dark plate instead of recolouring the artwork.":
    "透過背景に白で描かれたバッジの画像が、明るい背景に溶けて見えなくなっていました。画像の色を変える代わりに、暗い下地の上に表示することで解決しました。",
  "Push reminders fired for unchanged matches": "変更のない試合にもプッシュリマインドが送信された",
  "Every sync tick reminded subscribers about matches that had not changed. Reminders now only consider real changes, and the sync endpoint is idempotent.":
    "同期のたびに、変更のない試合についても購読者にリマインドが送られていました。現在は実際に変更があった場合だけが対象で、同期エンドポイントは冪等になっています。",
  "Team rosters silently corrupted by a parser change": "パーサーの変更でチームのロースターが気づかれずに壊れていた",
  "The Liquipedia scraper misread Person templates, dropping players from team pages. Fixed the parsing and added a refetch when a roster is missing.":
    "LiquipediaのスクレイパーがPersonテンプレートを誤って読み取り、チームページから選手が抜け落ちていました。解析処理を直し、ロースターが欠けている場合は再取得するようにしました。",
  "Published test report broke on every run": "公開しているテストレポートが、実行のたびに壊れた",
  "node_modules leaked into the gh-pages branch and broke the Pages build. The publish step now cleans untracked files before adding the report.":
    "node_modulesがgh-pagesブランチに混入し、Pagesのビルドが壊れていました。公開ステップで、レポートを追加する前に未追跡ファイルを削除するようにしました。",
  // api explorer
  "Run live checks": "ライブチェックを実行",
  Running: "実行中",
  "Response in {ms} ms · status {status} · {count} earthquakes in the feed right now": "応答時間 {ms} ms · ステータス {status} · 現在フィードにある地震 {count}件",
  "Status is 200": "ステータスが200である",
  "got {status}": "結果：{status}",
  "Body is a GeoJSON FeatureCollection": "本文がGeoJSONのFeatureCollectionである",
  "type: {type}": "type：{type}",
  "missing": "なし",
  "Features array is present": "featuresの配列が存在する",
  "{n} events in the last 24h": "過去24時間で{n}件",
  "Every event has a numeric magnitude": "すべてのイベントにマグニチュードの数値がある",
  "Every event has usable coordinates": "すべてのイベントに有効な座標がある",
  "Indonesia bounding box is queryable": "インドネシアの範囲（バウンディングボックス）で絞り込める",
  "{n} events inside 94-141.5E, 11.5S-6.5N": "東経94度から141.5度、南緯11.5度から北緯6.5度の範囲に{n}件",
  "The request failed: {message}. That is a real result too; the feed or the network is down right now.":
    "リクエストに失敗しました：{message}。これも実際の結果です。フィードかネットワークが、今ダウンしています。",
  "network error": "ネットワークエラー",
  // run suite
  "Run the QuakeWatch test suite, for real": "QuakeWatchのテストスイートを、実際に実行する",
  "This triggers the actual GitHub Actions workflow: 6 Playwright tests against the deployed app, browser install included, usually 3 to 6 minutes. The status below is polled from the public GitHub API while you wait.":
    "実際のGitHub Actionsワークフローを起動します。デプロイ済みアプリに対する6件のPlaywrightテストで、ブラウザのインストールを含めて通常3分から6分かかります。下のステータスは、待っている間、公開GitHub APIから定期的に取得しています。",
  "Running {mm}:{ss}": "実行中 {mm}:{ss}",
  Triggering: "起動中",
  "Run the suite": "スイートを実行",
  "Live triggering is not wired on this deployment yet.": "このデプロイでは、ライブ実行はまだ設定されていません。",
  "GitHub refused the dispatch (status {status}).": "GitHubがディスパッチを拒否しました（ステータス {status}）。",
  "A run was started a few minutes ago. Please wait a bit and try again.":
    "数分前に実行が開始されました。しばらく待ってからもう一度お試しください。",
  "The dispatch request failed.": "ディスパッチのリクエストに失敗しました。",
  "Run #{id}: {status}. ": "実行 #{id}：{status}。",
  "Waiting for the run to appear in GitHub Actions. ": "GitHub Actionsに実行が表示されるのを待っています。",
  "Watch it on GitHub": "GitHubで確認する",
  "All 6 tests passed.": "6件のテストがすべて合格しました。",
  "Finished: {c}.": "完了：{c}。",
  "Open the run": "実行結果を開く",
  "Open the HTML report": "HTMLレポートを開く",
  "See the latest real runs instead": "代わりに、最新の実際の実行履歴を見る",
  // architecture
  "Architecture.": "アーキテクチャ。",
  "Every diagram on this page is drawn from the actual repository: real routes, real tables, real cron schedules. Where a diagram type does not apply to a project, that is stated instead of drawn.":
    "このページの図はすべて、実際のリポジトリをもとに描いています。実在するルート、テーブル、cronのスケジュールです。あるプロジェクトに当てはまらない種類の図は、描かずに、その旨を書いています。",
  "Diagram labels are kept in English on purpose, so they match the route, table and service names in the code.":
    "図の中のラベルは、コード上のルート名、テーブル名、サービス名と一致させるため、英語のまま掲載しています。",
  "Skipped: ": "省略：",
  "System context": "システムコンテキスト図",
  "Sequence: a sync tick": "シーケンス図：同期1回分の流れ",
  "Data flow diagram, level 0": "データフロー図（レベル0）",
  "Data flow diagram, level 1: sync pipeline": "データフロー図（レベル1）：同期パイプライン",
  "Use case": "ユースケース図",
  "Entity relationship": "ER図",
  "Columns from supabase/migrations/0001_init.sql.": "カラムは supabase/migrations/0001_init.sql から取得。",
  "Sequence: page load and alert evaluation": "シーケンス図：ページ読み込みとアラート判定",
  "Sequence: dashboard load": "シーケンス図：ダッシュボードの読み込み",
  "Keys only; full columns in supabase/migrations.": "キーのみ。全カラムは supabase/migrations を参照。",
  "Sequence: page load with no FIRMS key": "シーケンス図：FIRMSキーなしでのページ読み込み",
  "Sequence: search and save to reading list": "シーケンス図：検索から読書リストへの保存",
  "CI pipeline": "CIパイプライン図",
  "Sequence: sign in, browse, order": "シーケンス図：ログイン、閲覧、注文",
  "Next.js PWA on Vercel with Supabase storage, synced from the official lolesports feed by a GitHub Actions cron every 5 minutes.":
    "VercelにデプロイしたNext.js製PWAで、データはSupabaseに保存します。公式lolesportsフィードからの同期は、GitHub Actionsのcronが5分ごとに実行します。",
  "Next.js dashboard that fetches the USGS, BMKG and JMA feeds directly from the browser and merges them into one live view.":
    "USGS、BMKG、気象庁（JMA）のフィードをブラウザから直接取得し、1つのライブビューに統合するNext.jsダッシュボードです。",
  "No ERD: the app has no database. Alert rules live in React state and reset on reload.":
    "ER図なし：このアプリにはデータベースがありません。アラートルールはReactのstateに保持され、再読み込みでリセットされます。",
  "No deeper DFD levels: level 0 already covers the whole data flow.": "より詳細なDFDなし：レベル0で全体のデータフローを網羅しています。",
  "Next.js app on Vercel with 18 pages and 18 API route handlers, backed by 24 Supabase tables. Results sync via a daily Vercel cron; push reminders are dispatched by a GitHub Actions schedule every 15 minutes.":
    "Vercel上のNext.jsアプリで、18ページと18個のAPIルートハンドラを持ち、24のSupabaseテーブルを使っています。結果の同期は毎日のVercel cronで行い、プッシュ通知のリマインドはGitHub Actionsのスケジュールで15分ごとに送信します。",
  "No DFD level 1: the sync detail lives in the sequence diagram; redrawing it as a DFD would add nothing.":
    "DFDレベル1なし：同期の詳細はシーケンス図に描いてあり、DFDに描き直しても情報は増えません。",
  "React + Vite SPA on Vercel with two serverless proxy functions. Live sources need no key (Open-Meteo, EONET); FIRMS and OpenAQ connect when keys are configured, and the UI labels every panel LIVE, DEMO or NOT CONNECTED accordingly.":
    "Vercel上のReact + Vite製SPAで、サーバーレスのプロキシ関数が2つあります。一部のライブデータはキー不要（Open-Meteo、EONET）で、FIRMSとOpenAQはキーを設定すると接続されます。UIは各パネルを、状態に応じてLIVE、DEMO、NOT CONNECTEDと表示します。",
  "No ERD: the app has no database.": "ER図なし：このアプリにはデータベースがありません。",
  "No deeper DFD levels: level 0 covers the whole flow.": "より詳細なDFDなし：レベル0で全体の流れを網羅しています。",
  "React SPA hosted on Firebase Hosting. All book data comes from the OpenLibrary API; the reading list persists in localStorage. No Firebase services are used, hosting only.":
    "Firebase Hostingで公開しているReact製SPAです。本のデータはすべてOpenLibrary APIから取得し、読書リストはlocalStorageに保存します。Firebaseのサービスはホスティングのみで、他は使っていません。",
  "No ERD: the only persistence is a localStorage list.": "ER図なし：永続化されるのはlocalStorage上のリストだけです。",
  "A test repository, so its architecture is a pipeline: 39 Playwright tests against the deployed ShelfSeeker app, publishing a results dashboard and an Allure report on every run.":
    "テスト用のリポジトリなので、構成はパイプラインそのものです。デプロイ済みのShelfSeekerアプリに対して39件のPlaywrightテストを実行し、実行ごとに結果ダッシュボードとAllureレポートを公開します。",
  "Context, DFD, use case and ERD do not apply to a test suite; the pipeline is the architecture.":
    "システムコンテキスト図、DFD、ユースケース図、ER図はテストスイートには当てはまりません。パイプラインがそのまま構成です。",
  "Flutter Android app on BLoC cubits over a repository layer, talking to the Dewa Management REST API at dewamanagement.com, with WhatsApp deep links for follow-ups.":
    "FlutterのAndroidアプリです。BLoCのCubitとリポジトリ層で構成し、dewamanagement.comのDewa Management REST APIと通信します。フォローアップにはWhatsAppのディープリンクを使います。",
  "No ERD: the database lives behind the company backend and its schema is not in this repository.":
    "ER図なし：データベースは会社のバックエンドの内側にあり、そのスキーマはこのリポジトリには含まれていません。",
  "{name}: {title}": "{name}：{title}",
};
export default b;
