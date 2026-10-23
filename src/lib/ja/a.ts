const a: Record<string, string> = {
  // meta
  "Hafiz Hamdani | Software QA Engineer": "Hafiz Hamdani | ソフトウェアQAエンジニア",
  "Portfolio of Hafiz (Dani) Hamdani, a software QA engineer in Jakarta working on mobile banking, and building dashboards and trackers on the side.":
    "ジャカルタでモバイルバンキングのQAを担当し、個人でもダッシュボードやトラッカーを作っている、ソフトウェアQAエンジニア Hafiz（Dani）Hamdani のポートフォリオです。",
  "Quality in numbers | Hafiz Hamdani": "数字で見る品質 | Hafiz Hamdani",
  "Real test counts per project, what is not tested yet, live API checks against the USGS feed, and a changelog of bugs found and fixed in my own work.":
    "プロジェクトごとの実際のテスト件数、まだテストしていない範囲、USGSフィードに対するライブAPIチェック、自分の作品で見つけて直したバグの履歴をまとめています。",
  "Architecture | Hafiz Hamdani": "アーキテクチャ | Hafiz Hamdani",
  "System context, sequence, data flow, use case and ER diagrams for each project, drawn from the real code and schemas in the repositories.":
    "各プロジェクトのシステムコンテキスト図、シーケンス図、データフロー図、ユースケース図、ER図です。リポジトリにある実際のコードとスキーマをもとに描いています。",
  "Sample work: test cases and bug reports | Hafiz Hamdani": "サンプルワーク：テストケースとバグ報告書 | Hafiz Hamdani",
  "A manual QA sample: real test cases and reproduced bug reports from a live execution against the public SauceDemo training app.":
    "手動QAのサンプルです。公開されている練習用アプリSauceDemoを実際にテストして得た、テストケースと再現済みのバグ報告書を載せています。",
  "Test strategy: Worlds 2026 Live | Hafiz Hamdani": "テスト戦略：Worlds 2026 Live | Hafiz Hamdani",
  "How the Worlds 2026 Live tracker is tested: 41 vitest cases across sync integrity, match state, auth, roster scraping, calendar feed, pick'em, push and forms, running in CI on every push.":
    "Worlds 2026 Liveトラッカーのテストの進め方です。同期の整合性、試合状態、認証、ロースターのスクレイピング、カレンダーフィード、勝敗予想、プッシュ通知、戦績にわたる41件のvitestケースを、プッシュのたびにCIで実行しています。",
  "Break this app | Hafiz Hamdani": "このアプリを壊してみてください | Hafiz Hamdani",
  "A tiny coffee shop with six deliberately seeded bugs. Hunt them down, then read the bug report I would file for each one.":
    "意図的に6つのバグを仕込んだ、小さなコーヒーショップです。バグを探し出したら、それぞれについて私が起票する報告書を読んでみてください。",
  // preloader
  Portfolio: "ポートフォリオ",
  Loading: "読み込み中",
  "Loading, {count} percent": "読み込み中、{count}パーセント",
  // nav / hero / footer
  About: "自己紹介",
  Experience: "職歴",
  Work: "制作物",
  Contact: "連絡先",
  "Hire me": "ご連絡ください",
  "Back to top": "ページの先頭へ",
  "Software QA Engineer": "ソフトウェアQAエンジニア",
  "Jakarta, Indonesia": "インドネシア・ジャカルタ",
  "I find the bugs before your users do. QA engineer testing Livin' by Mandiri, and a builder of side projects that keep my testing instincts sharp.":
    "ユーザーより先に、バグを見つけます。モバイルバンキングアプリ「Livin' by Mandiri」をテストするQAエンジニアとして働きながら、個人開発にも取り組み、テスターとしての勘を磨き続けています。",
  "Download CV": "CVをダウンロード（英語版）",
  "Scroll to discover": "スクロールして見る",
  "LET'S BREAK": "一緒に",
  SOMETHING: "壊しましょう",
  "Open to junior QA, software engineering and DevOps roles, and to conversations about testing, CI pipelines and dashboards.":
    "ジュニアレベルのQA、ソフトウェアエンジニア、DevOpsのポジションを探しています。テスト、CIパイプライン、ダッシュボードの話題でも、お気軽にご連絡ください。",
  Email: "メール",
  "Designed & built with Next.js, Motion and Three.js": "Next.js、Motion、Three.jsで設計・制作",
  // section headings
  "Methodical about breaking things.": "手順を踏んで、壊す。",
  "Where I've tested.": "テストしてきた現場。",
  "Things I've built.": "作ってきたもの。",
  "How I actually test.": "実際のテストの進め方。",
  "The paperwork too.": "ドキュメントも書きます。",
  "What I test with.": "使っている道具。",
  "Selected work": "主な制作物",
  "QA in practice": "QAの実践",
  "Sample work": "サンプルワーク",
  Toolbox: "スキルと道具",
  // about
  "I'm Dani, a QA engineer from Padang, now based in West Jakarta. My day job is testing Livin' by Mandiri, a mobile banking app: regression, smoke, UAT and API checks across its releases.":
    "パダン出身、現在は西ジャカルタ在住のQAエンジニア、ダニです。本業ではモバイルバンキングアプリ「Livin' by Mandiri」のテストを担当し、各リリースでリグレッション、スモーク、UAT、APIの確認を行っています。",
  "I studied computer engineering at Diponegoro University and learned QA by doing it: internships, test cases and regression cycles. After hours I build dashboards and trackers for the things I follow: fires, earthquakes, F1 and League of Legends. Shipping my own software makes me better at testing everyone else's.":
    "ディポネゴロ大学でコンピュータ工学を学び、QAは実践を通じて身につけました。インターンシップ、テストケースの作成、そして数多くのリグレッションサイクルです。仕事の後は、火災、地震、F1、League of Legendsなど、自分が追いかけているテーマのダッシュボードやトラッカーを作っています。自分のソフトウェアをリリースする経験が、他の人のソフトウェアをテストする力を磨いてくれます。",
  "~1 yr": "約1年",
  "of QA experience in mobile banking & fintech": "モバイルバンキングとフィンテックでのQA経験",
  "test cases executed on a live banking app": "稼働中のバンキングアプリで実行したテストケース",
  "production releases tested end to end": "本番リリースをE2Eでテスト",
  "people in the QA team I work in": "所属QAチームの人数",
  Now: "現在の取り組み",
  "Preparing for the ISTQB CTFL exam, with {a}notes in public{/a}.": "ISTQB CTFL試験の準備中です。学習ノートは{a}公開しています{/a}。",
  "Going deeper on Playwright.": "Playwrightをさらに深く学んでいます。",
  "Learning Rust, from zero.": "Rustを、ゼロから勉強中です。",
  "Learning Japanese, from zero.": "日本語を、ゼロから勉強中です。",
  // marquee / skills
  "Functional Testing": "機能テスト",
  "API Testing": "APIテスト",
  Regression: "リグレッションテスト",
  "Test Planning": "テスト計画",
  "Defect Tracking": "不具合管理",
  "Core QA": "QAの基本",
  "Used at work": "仕事で使っているツール",
  "In my side projects": "個人プロジェクトで使用",
  "Learning now": "現在学習中",
  "FastAPI & DuckDB": "FastAPIとDuckDB",
  "Newman & Allure": "NewmanとAllure",
  "Solana & Anchor": "SolanaとAnchor",
  "Functional & Manual Testing": "機能テスト・手動テスト",
  "Smoke & Sanity": "スモーク・サニティテスト",
  "Test Planning & Design": "テスト計画・設計",
  "An honest note: my automation experience comes from courses and side projects, not from owning automation in production. Not yet. Closing that gap is the point of everything on this page.":
    "正直にお伝えすると、自動化の経験は講座と個人開発によるもので、本番環境での運用経験はまだありません。そのギャップを埋めることこそが、このページに並べたすべての狙いです。",
  Credentials: "資格・認定",
  Education: "学歴",
  "In preparation, not certified yet": "準備中（未取得）",
  "SCRUMstudy, fundamentals": "SCRUMstudy（基礎レベル）",
  "Diponegoro University": "ディポネゴロ大学",
  "B.Eng. Computer Engineering": "工学士（コンピュータ工学）",
  "GPA 3.73/4.00 · graduated Jul 2025": "GPA 3.73 / 4.00 · 2025年7月卒業",
  "{org} logo": "{org}のロゴ",
  // experience
  "Jun 2026 to Present": "2026年6月から現在",
  "Oct 2025 to Apr 2026": "2025年10月から2026年4月",
  "Jan 2024 to Feb 2024": "2024年1月から2月",
  "IT Quality Assurance": "ITクオリティアシュアランス（QA）",
  "IT E2E QA Intern": "IT E2E QAインターン",
  "Information Systems Development Intern": "情報システム開発インターン",
  "National Land Agency (BPN)": "国家土地庁（BPN）",
  "Functional QA for Livin' by Mandiri, a mobile banking app used by millions. Regression, smoke, UAT and backward-compatibility testing across 10+ releases, including KSM Emas, Bullion gold savings, Deeplink/Universal Link and a security integration. Defects reported and tracked in JIRA within a 16-person QA team, with API verification through Postman and SQL.":
    "数百万人が利用するモバイルバンキングアプリ「Livin' by Mandiri」の機能QAを担当。リグレッションテスト、スモークテスト、UAT、後方互換性テストを、KSM Emas、金貯蓄サービスのBullion、ディープリンク/ユニバーサルリンク、セキュリティ連携を含む10件以上のリリースで実施しました。16人のQAチームの一員として、不具合をJIRAで報告・管理し、PostmanとSQLでAPIの確認も行っています。",
  "End-to-end QA for HCI × OPPO projects, including AVANTO. Ran SIT, UAT, smoke and regression cycles; wrote test scenarios and test cases and carried them through review and approval. Ran daily UAT syncs with OPPO Mainland on progress, findings and clarifications. First exposure to test automation with Selenium and Katalon.":
    "AVANTOを含む、HCI×OPPOプロジェクトのE2E QAを担当。SIT、UAT、スモークテスト、リグレッションテストのサイクルを回し、テストシナリオとテストケースを作成して、レビューと承認まで進めました。中国本土のOPPOチームとは毎日UATの打ち合わせを行い、進捗、検出事項、確認事項を共有。SeleniumとKatalonで、はじめてテスト自動化に触れました。",
  "Tested internal information systems used by agency staff and wrote the accompanying user documentation.":
    "職員が使う庁内の情報システムをテストし、付属のユーザー向けドキュメントを作成しました。",
  "Manual Testing": "手動テスト",
  "E2E Testing": "E2Eテスト",
  Documentation: "ドキュメント作成",
  // projects
  "A live tracker for the League of Legends World Championship: match center, bracket, standings, team pages, pick'em and push notifications. Next.js PWA backed by Supabase, syncing the official lolesports feed every 5 minutes.":
    "League of Legends World Championshipのライブトラッカー。試合センター、トーナメント表、順位表、チームページ、勝敗予想（pick'em）、プッシュ通知を備えています。Supabaseをバックエンドに使ったNext.js製PWAで、公式のlolesportsフィードを5分ごとに同期します。",
  "A Formula 1 intelligence dashboard for the 2026 season: calendar, live timing tower, standings, telemetry lab and tyre strategy. 101 unit tests, 19 contract tests and 10 Playwright end-to-end scenarios keep it honest.":
    "2026年シーズン向けのF1分析ダッシュボード。カレンダー、ライブタイミング、順位表、テレメトリ分析、タイヤ戦略を備えています。単体テスト101件、コントラクトテスト19件、PlaywrightによるE2Eシナリオ10件で、表示の正しさを守っています。",
  "Indonesian forest- and land-fire monitoring: NASA FIRMS hotspots, air-quality stations and modelled smoke plumes on one map, proxied through serverless functions.":
    "インドネシアの森林・土地火災の監視ツール。NASA FIRMSのホットスポット、大気質観測局、モデル計算による煙の拡散を1つの地図に重ね、サーバーレス関数経由でデータを取得します。",
  "Real-time earthquake dashboard pulling from USGS worldwide, BMKG for Indonesia and JMA for Japan, with regional views and a 60-second refresh.":
    "リアルタイム地震ダッシュボード。世界はUSGS、インドネシアはBMKG、日本は気象庁（JMA）のデータを取得し、地域別ビューと60秒ごとの自動更新に対応しています。",
  "Playwright end-to-end suite for ShelfSeeker: 39 tests across desktop and mobile emulation, running in GitHub Actions with a self-updating report dashboard and an Allure report per run.":
    "ShelfSeeker向けのPlaywright E2Eテストスイート。デスクトップとモバイルエミュレーションで39件のテストを、GitHub Actions上で実行します。結果ダッシュボードは自動更新され、実行ごとにAllureレポートも出力します。",
  "University project turned portfolio piece: a book-discovery app on the OpenLibrary API with a reading list, barcode scan and similar-book suggestions. Redesigned and extended in 2026. The badge here is live from the ShelfSeeker E2E suite (project 05), which tests this deployed app.":
    "大学のプロジェクトから、ポートフォリオ作品へ育てたアプリです。OpenLibrary APIを使った本の探索アプリで、読書リスト、バーコードスキャン、類似書籍の提案があります。2026年に再設計して機能を追加しました。ここのバッジは、このデプロイ済みアプリをテストするShelfSeeker E2Eスイート（プロジェクト05）の最新結果を、リアルタイムに表示しています。",
  "Final-thesis project: a Flutter mobile app and companion website talking over a REST API, built for a real stakeholder, Dewa Management.":
    "卒業研究のプロジェクト。FlutterのモバイルアプリとWebサイトをREST APIでつなぎ、実際の依頼元であるDewa Management向けに開発しました。",
  "A defensive CLI that checks PHP runtimes against the PHP2Shell fixes (CVE-2026-109618 and CVE-2026-109619). It inventories local installs, SSH hosts, HTTP headers and logs, and tracks which Ubuntu package owns each binary so an unrelated package can never pass as a patch. It reports version and inventory evidence, never a blanket 'site is safe' verdict. 41 tests run in CI on Python 3.9 and 3.12.":
    "PHP2Shellの修正（CVE-2026-109618とCVE-2026-109619）に対して、PHPランタイムをチェックする防御用CLIです。ローカルのインストール、SSHホスト、HTTPヘッダー、ログを調査し、各バイナリを所有するUbuntuパッケージを追跡するため、無関係のパッケージがパッチ扱いされることはありません。「サイトは安全」という包括的な判定ではなく、バージョンとインベントリの証拠を報告するツールです。CIではPython 3.9と3.12で41件のテストを実行しています。",
  "A personal bookshelf for a real 50-volume collection of manga and novels. Drag spines into any order, open a per-book journal with ratings, notes, quotes and loan tracking, get a mood-based random pick, or play per-book soundtracks on a vinyl turntable. Add your own books by hand or by ISBN lookup. Local-first: everything stays in the browser, with validated JSON backup and restore. 194 unit and Playwright checks run against the production build.":
    "実際に所有するマンガと小説50冊のための、個人の本棚アプリです。背表紙をドラッグして自由に並び替え、評価・メモ・引用・貸出記録を1冊ごとのジャーナルに残せます。気分に合わせたランダム選書や、レコードプレイヤーで流す本ごとのサウンドトラックも楽しめます。自分の本は手入力またはISBN検索で追加できます。ローカルファースト設計で、データはすべてブラウザ内に保存され、検証付きのJSONバックアップと復元に対応しています。194件のunitテストとPlaywrightチェックを、プロダクションビルドに対して実行しています。",
  Live: "デモ",
  Code: "コード",
  "Test strategy": "テスト戦略",
  Architecture: "アーキテクチャ",
  "Tests passing": "テスト成功",
  "Tests {c}": "テスト結果：{c}",
  "Live from GitHub Actions": "GitHub Actionsからのライブ情報",
  "Latest {workflow} run on GitHub Actions: {label}, {date}": "GitHub Actionsでの最新の{workflow}実行：{label}、{date}",
  // case studies
  "API testing in CI with Postman + Newman": "PostmanとNewmanによるCIでのAPIテスト",
  "A self-directed API testing practice against two public Formula 1 APIs (Jolpica and OpenF1). No employer or private data is involved.":
    "F1の公開API2つ（JolpicaとOpenF1）を対象にした、自主的なAPIテストの実践です。勤務先のデータや非公開のデータは一切使っていません。",
  "Designed a 13-request Postman collection with 41 assertions on real payloads: standings ordering, sequential finishing positions, required fields on every record.":
    "13リクエストのPostmanコレクションを作成し、実際のレスポンスに対して41件のアサーションを書きました。順位の並び、連続したフィニッシュ順位、全レコードの必須項目などを検証します。",
  "Chained dynamic data between requests: the latest race session key feeds the driver and lap calls.":
    "リクエスト間で動的なデータを受け渡しています。最新のレースセッションキーを、ドライバーとラップのAPI呼び出しに引き継ぎます。",
  "Verified pagination behaviour and documented each API's error quirks against the live endpoints, including rate limits and empty-result semantics.":
    "ページネーションの動作を確認し、レート制限や結果が空のときの扱いなど、各APIのエラー時のクセを本番エンドポイントで確かめて文書化しました。",
  "Set a 3-second performance budget per response and wired the suite into GitHub Actions: on every change, on demand, and weekly as an availability monitor.":
    "レスポンスごとに3秒の性能上限を設け、スイートをGitHub Actionsに組み込みました。変更のたび、手動実行、そして死活監視として毎週実行します。",
  "Shows how I design API tests: real assertions on real payloads, quirks documented instead of assumed, and a report anyone can open.":
    "APIテストの進め方をご覧いただけます。実際のレスポンスに対する意味のあるアサーション、推測ではなく確認した上で書き残したAPIの挙動、誰でも開けるレポートです。",
  "Live Newman report": "Newmanレポート（公開）",
  Repository: "リポジトリ",
  "End-to-end testing ShelfSeeker with Playwright": "PlaywrightによるShelfSeekerのE2Eテスト",
  "A full E2E suite for my own book-discovery app: 39 tests running as 78 combinations across desktop Chrome and Pixel 7 emulation in GitHub Actions.":
    "自作の本の探索アプリに対するE2Eテスト一式です。39件のテストを、デスクトップChromeとPixel 7エミュレーションの組み合わせで計78通り、GitHub Actions上で実行しています。",
  "Mapped coverage from user flows first: search, filters, paging, reading list, import/export, then the unhappy paths: server errors, network failure, slow API, offline state.":
    "まずユーザーの操作フロー（検索、フィルター、ページ送り、読書リスト、インポート/エクスポート）からカバレッジを整理し、次に異常系（サーバーエラー、ネットワーク障害、APIの遅延、オフライン状態）を洗い出しました。",
  "Intercepted network calls against a mocked OpenLibrary so the suite is deterministic, and documented plainly what that does and does not prove.":
    "OpenLibraryをモックしてネットワーク呼び出しを差し替え、テスト結果が毎回同じになるようにしました。それで何が保証され、何が保証されないかも、率直に文書化しています。",
  "Analyzed run history for flakiness and tracked it in a written flaky-test analysis.":
    "実行履歴から不安定なテスト（フレーキーテスト）を分析し、その結果を文書にまとめて追跡しています。",
  "Built a self-updating results dashboard and a full Allure report on every CI run.":
    "CIの実行ごとに、自動更新される結果ダッシュボードとAllureの詳細レポートを生成する仕組みを作りました。",
  "Shows how I think about coverage: user flows before test counts, honest limits stated up front, and results visible without digging through CI logs.":
    "カバレッジの考え方が分かります。テスト件数よりユーザーフローを先に考え、限界は最初に正直に示し、CIのログを掘らなくても結果が見えるようにしています。",
  "Results dashboard": "結果ダッシュボード",
  "Keeping a live data app honest: APEX F1": "ライブデータアプリの正しさを守る：APEX F1",
  "My F1 dashboard mixes live, delayed, historical and demo data from several providers, a correctness risk if any panel overstates what it knows.":
    "私のF1ダッシュボードは、複数の提供元のライブ、遅延、過去、デモのデータを混在して扱います。どこかのパネルが実際以上のことを示してしまえば、正確性のリスクになります。",
  "Labelled every panel by data provenance (LIVE, DELAYED, HISTORICAL, DEMO DATA) so the UI never presents delayed or fallback data as live.":
    "すべてのパネルにデータの出どころ（LIVE、DELAYED、HISTORICAL、DEMO DATA）を表示し、遅延データや代替データをライブとして見せないようにしました。",
  "Protected that contract with 101 unit tests, 19 contract tests and 10 Playwright end-to-end scenarios in CI.":
    "この約束事を、CI上の単体テスト101件、コントラクトテスト19件、PlaywrightのE2Eシナリオ10件で守っています。",
  "Used a bundled snapshot of real recorded race data as the demo fallback instead of fabricated numbers.":
    "デモ用の代替データには、作り物の数値ではなく、実際に記録されたレースデータのスナップショットを同梱して使っています。",
  "Shows the instinct I test with: the most expensive bugs are the ones where software looks right while saying something false.":
    "私のテストの勘所が分かります。一番高くつくバグは、見た目は正しいのに、実際には誤ったことを伝えているソフトウェアです。",
  "Live app": "公開アプリ",
  // sample work home section
  "The case studies above show the automation side. This is the manual craft: a test plan, test cases and bug reports from a real execution against SauceDemo, a public training app. My day-job artifacts are confidential, so this set stands in for them. 11 cases run, 7 passed, 4 defects reproduced and filed, all on 18 October 2026.":
    "上のケーススタディでは自動化の面をご紹介しました。こちらは手動テストの仕事ぶりです。公開されている練習用アプリSauceDemoを実際にテストし、テスト計画、テストケース、バグ報告書をまとめました。業務の成果物は社外秘のため、このセットがその代わりです。11ケースを実行して7件が合格、4件の不具合を再現して報告しています。すべて2026年10月18日の実施です。",
  "See the test cases and bug reports": "テストケースとバグ報告書を見る",
  "Quality in numbers: coverage, live API checks, bug changelog": "数字で見る品質：カバレッジ、ライブAPIチェック、バグ修正履歴",
  "Full set on GitHub": "GitHubで全件を見る",
  "Cases run": "実行ケース",
  Passed: "合格",
  "Defects filed": "報告した不具合",
};
export default a;
