"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "id" | "ja" | "ko" | "zh";

export const LANGS: { code: Lang; label: string; mt: boolean }[] = [
  { code: "en", label: "EN", mt: false },
  { code: "id", label: "ID", mt: false },
  { code: "ja", label: "JA", mt: true },
  { code: "ko", label: "KO", mt: true },
  { code: "zh", label: "ZH", mt: true },
];

/** mt = machine translation. EN and ID are written by hand. */
type Dict = Partial<Record<Lang, Record<string, string>>>;

const DICT: Dict = {
  id: {
    "nav.about": "Tentang",
    "nav.experience": "Pengalaman",
    "nav.work": "Karya",
    "nav.contact": "Kontak",
    "nav.hireme": "Rekrut saya",
    "nav.mt": "terjemahan mesin",
    "hero.tagline":
      "Saya merusak software sebelum pengguna Anda melakukannya. QA engineer di aplikasi mobile banking yang dipakai jutaan orang - dan membangun proyek sampingan supaya tidak pernah berhenti merusak hal-hal yang menarik.",
    "hero.cv": "Unduh CV",
    "hero.scroll": "Gulir untuk menjelajah",
    "sh.about.label": "Tentang",
    "sh.about.title": "Metodis soal merusak sesuatu.",
    "sh.experience.label": "Pengalaman",
    "sh.experience.title": "Tempat saya menguji.",
    "sh.work.label": "Karya pilihan",
    "sh.work.title": "Yang sudah saya bangun.",
    "sh.practice.label": "QA dalam praktik",
    "sh.practice.title": "Cara saya benar-benar menguji.",
    "sh.skills.label": "Kotak perkakas",
    "sh.skills.title": "Alat uji saya.",
    "about.p1":
      "Saya Dani - QA engineer asal Padang, sekarang tinggal di Jakarta Barat. Setiap hari saya menguji Livin' by Mandiri, aplikasi mobile banking yang dipercaya jutaan orang untuk uang mereka, jadi bug harus berhadapan dulu dengan saya sebelum berhadapan dengan mereka.",
    "about.p2":
      "Saya lulusan teknik komputer Universitas Diponegoro, dan masuk ke QA lewat jalan yang jujur: magang, test case, dan banyak siklus regresi. Di luar kerja saya membangun dashboard dan tracker untuk hal-hal yang saya ikuti - kebakaran hutan, gempa, F1, League of Legends - karena merilis proyek sendiri membuat saya jadi penguji yang lebih baik untuk proyek orang lain.",
    "stats.0.label": "pengalaman QA di mobile banking & fintech",
    "stats.1.label": "test case dijalankan di aplikasi bank live",
    "stats.2.label": "rilis produksi diuji dari ujung ke ujung",
    "stats.3.label": "orang di tim QA tempat saya bekerja",
    "exp.0.role": "IT Quality Assurance",
    "exp.0.period": "Jun 2026 - Sekarang",
    "exp.0.summary":
      "QA fungsional untuk Livin' by Mandiri, aplikasi mobile banking yang dipakai jutaan orang. Pengujian regresi, smoke, UAT dan kompatibilitas-mundur untuk 10+ rilis, termasuk KSM Emas, Bullion gold savings, Deeplink/Universal Link dan integrasi keamanan. Defect dilaporkan dan dilacak di JIRA dalam tim QA beranggotakan 16 orang, dengan verifikasi API lewat Postman dan SQL.",
    "exp.1.period": "Okt 2025 - Apr 2026",
    "exp.1.summary":
      "QA end-to-end untuk proyek HCI x OPPO, termasuk AVANTO. Menjalankan siklus SIT, UAT, smoke dan regresi; menulis skenario dan test case lalu membawanya sampai review dan approval. Menjalankan sinkronisasi UAT harian dengan OPPO Mainland soal progres, temuan dan klarifikasi. Pengalaman pertama dengan otomasi pengujian memakai Selenium dan Katalon.",
    "exp.2.summary":
      "Menguji sistem informasi internal yang dipakai staf agensi dan menulis dokumentasi pengguna pendampingnya.",
    "work.live": "Live",
    "work.code": "Kode",
    "work.strategy": "Strategi uji",
    "p.0.description":
      "Tracker live untuk League of Legends World Championship: match center, bracket, standings, halaman tim, pick'em dan push notification. PWA Next.js dengan Supabase, menyinkronkan feed resmi lolesports setiap menit.",
    "p.1.description":
      "Dashboard intelijen Formula 1 untuk musim 2026: kalender, timing tower live, standings, lab telemetri dan strategi ban. 37 unit test dan 10 skenario end-to-end Playwright menjaganya tetap jujur.",
    "p.2.description":
      "Pemantauan kebakaran hutan dan lahan Indonesia: hotspot NASA FIRMS, stasiun kualitas udara dan kepulan asap hasil pemodelan dalam satu peta, diproksi lewat serverless function.",
    "p.3.description":
      "Dashboard gempa real-time dari USGS untuk dunia, BMKG untuk Indonesia dan JMA untuk Jepang, dengan tampilan regional dan refresh 60 detik.",
    "p.4.description":
      "Suite end-to-end Playwright untuk ShelfSeeker: 39 pengujian di emulasi desktop dan mobile, berjalan di GitHub Actions dengan dashboard laporan yang memperbarui dirinya sendiri dan laporan Allure per run.",
    "p.5.description":
      "PWA pencari buku mobile-first di atas OpenLibrary API: pencarian, reading list, dan scan barcode ISBN. Tugas akhir universitas.",
    "p.6.description":
      "Aplikasi mobile Flutter untuk platform jasa pernikahan Dewa Management, di atas REST API Laravel.",
    "cs.0.title": "Pengujian API di CI dengan Postman + Newman",
    "cs.0.context":
      "Latihan pengujian API mandiri terhadap dua API Formula 1 publik (Jolpica dan OpenF1) - tanpa data employer atau data privat.",
    "cs.0.takeaway":
      "Menunjukkan cara saya merancang test API: assertion nyata di payload nyata, quirks didokumentasikan bukan diasumsikan, dan laporan yang bisa dibuka siapa saja.",
    "cs.1.title": "Pengujian end-to-end ShelfSeeker dengan Playwright",
    "cs.1.context":
      "Suite E2E lengkap untuk aplikasi pencari buku saya sendiri - 39 pengujian yang berjalan sebagai 78 kombinasi di desktop Chrome dan emulasi Pixel 7 dalam GitHub Actions.",
    "cs.1.takeaway":
      "Menunjukkan cara saya berpikir soal cakupan: alur pengguna sebelum jumlah test, batasan dinyatakan jujur di awal, dan hasil terlihat tanpa menggali log CI.",
    "cs.2.title": "Menjaga aplikasi data live tetap jujur: APEX F1",
    "cs.2.context":
      "Dashboard F1 saya mencampur data live, delayed, historis dan demo dari beberapa provider - risiko kebenaran jika ada panel yang melebih-lebihkan apa yang ia tahu.",
    "cs.2.takeaway":
      "Menunjukkan insting saya dalam menguji: bug termahal adalah ketika software terlihat benar sambil mengatakan hal yang salah.",
    "sg.0.title": "Inti QA",
    "sg.1.title": "Alat",
    "sg.2.title": "Kode & Otomasi",
    "skills.honest":
      "Catatan jujur: kemampuan otomasi saya datang dari kursus dan proyek sampingan, belum dari kepemilikan di produksi. Itu gap yang sengaja sedang saya tutup.",
    "skills.credentials": "Kredensial",
    "skills.education": "Pendidikan",
    "cred.0.detail": "Sedang dipersiapkan - belum tersertifikasi",
    "edu.degree": "S.T. Teknik Komputer",
    "edu.grad": "lulus Jul 2025",
    "contact.label": "Kontak",
    "contact.h1": "AYO RUSAK",
    "contact.h2": "SESUATU",
    "contact.blurb":
      "Terbuka untuk peran junior QA, software engineering dan DevOps - dan untuk ngobrol soal testing, CI pipeline, dashboard, atau kenapa rilis Anda terus molor.",
    "footer.built": "Didesain & dibangun dengan Next.js, Motion dan Three.js",
    "ts.passing": "Tes lolos",
    "ts.failing": "Tes gagal",
    "ts.aria": "Run {workflow} terakhir di GitHub Actions: {label}, {date}",
    "bh.aria": "Ketemu bug? Buka form laporan bug.",
    "bh.title": "Laporan bug",
    "bh.create": "Buat issue",
    "bh.summary": "Ringkasan",
    "bh.summaryValue": "Bug tersembunyi di situs portofolio",
    "bh.severity": "Severity",
    "bh.steps": "Langkah reproduksi",
    "bh.stepsValue": "1. Buka portofolio\n2. Gulir sampai paling bawah\n3. Perhatikan baik-baik",
    "bh.expected": "Ekspektasi",
    "bh.expectedValue": "Tidak ada bug. Jelas dong.",
    "bh.actual": "Aktual",
    "bh.actualValue": "Ada bug. Kamu menemukannya.",
    "bh.demo": "Demo saja - laporan ini tidak pernah meninggalkan browser kamu.",
    "bh.cancel": "Batal",
    "bh.submit": "Buat",
    "bh.created": "Issue dibuat",
    "bh.status": "Status",
    "bh.todo": "To Do",
    "bh.assignee": "Assignee",
    "bh.assigneeValue": "Dani (triage setelah kopi)",
    "bh.reporter": "Reporter",
    "bh.reporterValue": "Kamu, si mata tajam",
    "bh.note":
      "Begini cara saya suka membaca laporan bug: langkah yang bisa direproduksi, ekspektasi vs aktual, severity yang jujur. Tersimpan hanya di browser kamu.",
    "bh.done": "Selesai",
    "bh.reportIt": "laporkan",
    "bh.found": "Ketemu bug?",
  },

  ja: {
    "nav.about": "について",
    "nav.experience": "経歴",
    "nav.work": "制作物",
    "nav.contact": "連絡先",
    "nav.hireme": "採用する",
    "nav.mt": "機械翻訳",
    "hero.tagline":
      "ユーザーが遭遇する前にソフトウェアを壊すのが私の仕事です。数百万人が使うモバイルバンキングアプリのQAエンジニアとして働きながら、面白いものを壊し続けるためにサイドプロジェクトも作っています。",
    "hero.cv": "CVをダウンロード",
    "hero.scroll": "スクロールして見る",
    "sh.about.label": "について",
    "sh.about.title": "壊すことにも几帳面に。",
    "sh.experience.label": "経歴",
    "sh.experience.title": "テストしてきた場所。",
    "sh.work.label": "主な制作物",
    "sh.work.title": "作ってきたもの。",
    "sh.practice.label": "QAの実践",
    "sh.practice.title": "私の実際のテスト方法。",
    "sh.skills.label": "ツールボックス",
    "sh.skills.title": "テストに使うもの。",
    "about.p1":
      "Daniです。パダン出身、現在は西ジャカルタ在住のQAエンジニアです。昼間は、何百万人がお金を預けるモバイルバンキングアプリ Livin' by Mandiri をテストしています。つまり、バグはユーザーに会う前に私に会わなければなりません。",
    "about.p2":
      "ディポネゴロ大学でコンピュータ工学を卒業し、インターンシップ、テストケース、そして多くのリグレッションサイクルという正直な道を通ってQAに入りました。仕事の外では、森林火災、地震、F1、League of Legends など、自分が追っているもののダッシュボードやトラッカーを作っています。自分のプロジェクトを出荷することが、他人のプロジェクトをより上手にテストすることに繋がるからです。",
    "stats.0.label": "モバイルバンキングとフィンテックでのQA経験",
    "stats.1.label": "本番バンキングアプリで実行したテストケース",
    "stats.2.label": "エンドツーエンドでテストした本番リリース",
    "stats.3.label": "所属するQAチームの人数",
    "exp.0.period": "2026年6月 - 現在",
    "exp.0.summary":
      "数百万人が使うモバイルバンキングアプリ Livin' by Mandiri の機能QA。KSM Emas、Bullion gold savings、Deeplink/Universal Link、セキュリティ統合を含む10以上のリリースで、リグレッション、スモーク、UAT、後方互換性テストを実施。16人のQAチームでJIRAによる不具合の報告と追跡を行い、PostmanとSQLでAPIを検証。",
    "exp.1.period": "2025年10月 - 2026年4月",
    "exp.1.summary":
      "AVANTOを含むHCI x OPPOプロジェクトのエンドツーエンドQA。SIT、UAT、スモーク、リグレッションの各サイクルを実行し、テストシナリオとテストケースを作成してレビューと承認まで完了。進捗、発見、確認事項についてOPPO Mainlandと日次のUATシンクを実施。SeleniumとKatalonでテスト自動化に初めて触れる。",
    "exp.2.summary":
      "職員が使用する社内情報システムをテストし、付随するユーザードキュメントを作成。",
    "work.live": "Live",
    "work.code": "コード",
    "work.strategy": "テスト戦略",
    "p.0.description":
      "League of Legends World Championship のライブトラッカー: マッチセンター、ブラケット、 standings、チームページ、pick'em、プッシュ通知。Supabase を基盤とした Next.js PWA で、公式 lolesports フィードを毎分同期。",
    "p.1.description":
      "2026年シーズンの Formula 1 インテリジェンスダッシュボード: カレンダー、ライブタイミングタワー、 standings、テレメトリーラボ、タイヤ戦略。37のユニットテストと10の Playwright E2E シナリオが正確さを保つ。",
    "p.2.description":
      "インドネシアの森林・土地火災モニタリング: NASA FIRMS ホットスポット、大気質ステーション、モデル化された煙プルームを1つの地図に集約し、サーバーレス関数でプロキシ。",
    "p.3.description":
      "世界の USGS、インドネシアの BMKG、日本の JMA から取得するリアルタイム地震ダッシュボード。地域ビューと60秒更新。",
    "p.4.description":
      "ShelfSeeker 向け Playwright E2E スイート: デスクトップとモバイルエミュレーションで39テスト、GitHub Actions で実行。自動更新のレポートダッシュボードと実行ごとの Allure レポート付き。",
    "p.5.description":
      "OpenLibrary API 上のモバイルファースト書籍検索PWA: 検索、読書リスト、ISBNバーコードスキャン。大学の卒業プロジェクト。",
    "p.6.description":
      "Dewa Management 婚礼サービスプラットフォーム向け Flutter モバイルアプリ。Laravel REST API がバックエンド。",
    "cs.0.title": "Postman + Newman による CI でのAPIテスト",
    "cs.0.context":
      "2つの公開 Formula 1 API (Jolpica と OpenF1) に対する自主的なAPIテストの練習。雇用主やプライベートなデータは不使用。",
    "cs.0.takeaway":
      "私のAPIテスト設計を示すもの: 実際のペイロードに対する実際のアサーション、癖は想定せず記録、誰でも開けるレポート。",
    "cs.1.title": "Playwright による ShelfSeeker のE2Eテスト",
    "cs.1.context":
      "自分の書籍検索アプリのための完全なE2Eスイート。39テストがデスクトップ Chrome と Pixel 7 エミュレーションで78の組み合わせとして GitHub Actions で実行。",
    "cs.1.takeaway":
      "カバレッジに対する私の考え方を示すもの: テスト数よりユーザーフロー、限界は最初に正直に述べ、結果はCIログを掘らなくても見えるように。",
    "cs.2.title": "ライブデータアプリの正直さを保つ: APEX F1",
    "cs.2.context":
      "私のF1ダッシュボードは複数のプロバイダーからのライブ、遅延、過去、デモデータを混在させており、パネルが実際以上を示せば正確性のリスクになる。",
    "cs.2.takeaway":
      "私のテストの本能を示すもの: 最も高くつくバグは、ソフトウェアが正しく見えながら間違ったことを言うもの。",
    "sg.0.title": "コアQA",
    "sg.1.title": "ツール",
    "sg.2.title": "コードと自動化",
    "skills.honest":
      "正直な注記: 私の自動化スキルはコースとサイドプロジェクト由来で、本番での所有経験はまだありません。それが意図的に埋めているギャップです。",
    "skills.credentials": "資格",
    "skills.education": "学歴",
    "cred.0.detail": "準備中 - まだ未取得",
    "edu.degree": "コンピュータ工学士",
    "edu.grad": "2025年7月卒業",
    "contact.label": "連絡先",
    "contact.h1": "何かを",
    "contact.h2": "壊そう",
    "contact.blurb":
      "ジュニアQA、ソフトウェアエンジニア、DevOps のポジション、およびテスト、CIパイプライン、ダッシュボード、リリースが遅れる理由についての会話を歓迎します。",
    "footer.built": "Next.js、Motion、Three.js で設計・構築",
    "ts.passing": "テスト通過",
    "ts.failing": "テスト失敗",
    "bh.aria": "バグ発見? バグレポートフォームを開く。",
    "bh.found": "バグ発見?",
    "bh.title": "バグレポート",
    "bh.create": "課題を作成",
    "bh.summary": "要約",
    "bh.summaryValue": "ポートフォリオサイトの隠れたバグ",
    "bh.severity": "重要度",
    "bh.steps": "再現手順",
    "bh.stepsValue": "1. ポートフォリオを開く\n2. 一番下までスクロール\n3. よく見る",
    "bh.expected": "期待結果",
    "bh.expectedValue": "バグなし。当然。",
    "bh.actual": "実際の結果",
    "bh.actualValue": "バグあり。見つけましたね。",
    "bh.demo": "デモのみ - このレポートはブラウザの外に出ません。",
    "bh.cancel": "キャンセル",
    "bh.submit": "作成",
    "bh.created": "課題を作成しました",
    "bh.status": "ステータス",
    "bh.todo": "To Do",
    "bh.assignee": "担当者",
    "bh.assigneeValue": "Dani (コーヒーの後にトリアージ)",
    "bh.reporter": "報告者",
    "bh.reporterValue": "鋭い目を持つあなた",
    "bh.note":
      "私が好むバグレポートの形: 再現可能な手順、期待結果と実際の結果、正直な重要度。ブラウザにのみ保存されます。",
    "bh.done": "完了",
    "strategy.enOnly": "このページは英語のみです。",
  },

  ko: {
    "nav.about": "소개",
    "nav.experience": "경력",
    "nav.work": "프로젝트",
    "nav.contact": "연락처",
    "nav.hireme": "채용하기",
    "nav.mt": "기계 번역",
    "hero.tagline":
      "사용자가 겪기 전에 소프트웨어를 먼저 망가뜨립니다. 수백만 명이 사용하는 모바일 뱅킹 앱을 테스트하는 QA 엔지니어이며, 흥미로운 것들을 계속 망가뜨리기 위해 사이드 프로젝트도 만듭니다.",
    "hero.cv": "CV 다운로드",
    "hero.scroll": "스크롤하여 살펴보기",
    "sh.about.label": "소개",
    "sh.about.title": "망가뜨리는 일에도 꼼꼼하게.",
    "sh.experience.label": "경력",
    "sh.experience.title": "테스트해온 곳들.",
    "sh.work.label": "주요 프로젝트",
    "sh.work.title": "만든 것들.",
    "sh.practice.label": "QA 실무",
    "sh.practice.title": "실제로 테스트하는 방법.",
    "sh.skills.label": "도구함",
    "sh.skills.title": "테스트에 쓰는 것들.",
    "about.p1":
      "저는 Dani입니다. 파당 출신이고 지금은 서자카르타에 사는 QA 엔지니어입니다. 낮에는 수백만 명이 돈을 맡기는 모바일 뱅킹 앱 Livin' by Mandiri를 테스트합니다. 그래서 버그는 사용자를 만나기 전에 저를 먼저 만나야 합니다.",
    "about.p2":
      "디포네고로 대학교에서 컴퓨터 공학을 졸업했고, 인턴십과 테스트 케이스, 수많은 리그레션 사이클이라는 정직한 길로 QA에 들어왔습니다. 일 밖에서는 산불, 지진, F1, League of Legends 등 제가 따라가는 것들의 대시보드와 트래커를 만듭니다. 제 프로젝트를 직접 출시하는 것이 남의 프로젝트를 더 잘 테스트하게 해주기 때문입니다.",
    "stats.0.label": "모바일 뱅킹 및 핀테크 QA 경력",
    "stats.1.label": "실서비스 뱅킹 앱에서 실행한 테스트 케이스",
    "stats.2.label": "엔드투엔드로 테스트한 프로덕션 릴리스",
    "stats.3.label": "제가 일하는 QA 팀의 인원",
    "exp.0.period": "2026년 6월 - 현재",
    "exp.0.summary":
      "수백만 명이 사용하는 모바일 뱅킹 앱 Livin' by Mandiri의 기능 QA. KSM Emas, Bullion gold savings, Deeplink/Universal Link, 보안 통합을 포함한 10개 이상의 릴리스에서 리그레션, 스모크, UAT, 하위 호환성 테스트를 수행. 16명의 QA 팀에서 JIRA로 결함을 보고하고 추적하며, Postman과 SQL로 API를 검증.",
    "exp.1.period": "2025년 10월 - 2026년 4월",
    "exp.1.summary":
      "AVANTO를 포함한 HCI x OPPO 프로젝트의 엔드투엔드 QA. SIT, UAT, 스모크, 리그레션 사이클을 수행하고 테스트 시나리오와 케이스를 작성해 리뷰와 승인까지 완료. 진행 상황, 발견 사항, 확인 사항에 대해 OPPO Mainland와 매일 UAT 싱크를 진행. Selenium과 Katalon으로 테스트 자동화를 처음 경험.",
    "exp.2.summary":
      "직원들이 사용하는 내부 정보 시스템을 테스트하고 관련 사용자 문서를 작성.",
    "work.live": "Live",
    "work.code": "코드",
    "work.strategy": "테스트 전략",
    "p.0.description":
      "League of Legends World Championship 라이브 트래커: 매치 센터, 브래킷, 순위, 팀 페이지, pick'em, 푸시 알림. Supabase 기반 Next.js PWA로 공식 lolesports 피드를 매분 동기화.",
    "p.1.description":
      "2026 시즌 Formula 1 인텔리전스 대시보드: 캘린더, 라이브 타이밍 타워, 순위, 텔레메트리 랩, 타이어 전략. 37개의 유닛 테스트와 10개의 Playwright E2E 시나리오가 정확성을 지킴.",
    "p.2.description":
      "인도네시아 산림 및 토지 화재 모니터링: NASA FIRMS 핫스팟, 대기질 관측소, 모델링된 연기 기둥을 하나의 지도에 모아 서버리스 함수로 프록시.",
    "p.3.description":
      "전 세계 USGS, 인도네시아 BMKG, 일본 JMA에서 가져오는 실시간 지진 대시보드. 지역별 보기와 60초 새로고침.",
    "p.4.description":
      "ShelfSeeker용 Playwright E2E 스위트: 데스크톱 및 모바일 에뮬레이션에서 39개 테스트, GitHub Actions에서 실행. 자동 갱신 결과 대시보드와 실행마다 Allure 리포트 제공.",
    "p.5.description":
      "OpenLibrary API 기반 모바일 우선 책 검색 PWA: 검색, 읽기 목록, ISBN 바코드 스캔. 대학 졸업 프로젝트.",
    "p.6.description":
      "Dewa Management 웨딩 서비스 플랫폼용 Flutter 모바일 앱. Laravel REST API 기반.",
    "cs.0.title": "Postman + Newman으로 CI에서 API 테스트하기",
    "cs.0.context":
      "두 개의 공개 Formula 1 API (Jolpica, OpenF1)를 대상으로 한 자발적 API 테스트 연습. 고용주나 비공개 데이터는 사용하지 않음.",
    "cs.0.takeaway":
      "제 API 테스트 설계 방식을 보여줍니다: 실제 페이로드에 대한 실제 assertion, quirks는 추측하지 않고 문서화, 누구나 열어볼 수 있는 리포트.",
    "cs.1.title": "Playwright로 ShelfSeeker E2E 테스트하기",
    "cs.1.context":
      "제 책 검색 앱을 위한 완전한 E2E 스위트. 39개 테스트가 데스크톱 Chrome과 Pixel 7 에뮬레이션에서 78개 조합으로 GitHub Actions에서 실행.",
    "cs.1.takeaway":
      "커버리지에 대한 제 사고방식을 보여줍니다: 테스트 수보다 사용자 플로우, 한계는 처음에 정직하게 밝히고, 결과는 CI 로그를 파지 않아도 보이게.",
    "cs.2.title": "라이브 데이터 앱의 정직함 지키기: APEX F1",
    "cs.2.context":
      "제 F1 대시보드는 여러 프로바이더의 라이브, 지연, 과거, 데모 데이터를 섞어 쓰므로, 패널이 아는 것 이상을 말하면 정확성 위험이 됩니다.",
    "cs.2.takeaway":
      "제 테스트 본능을 보여줍니다: 가장 비용이 큰 버그는 소프트웨어가 옳아 보이면서 거짓을 말하는 것입니다.",
    "sg.0.title": "핵심 QA",
    "sg.1.title": "도구",
    "sg.2.title": "코드 및 자동화",
    "skills.honest":
      "솔직한 메모: 제 자동화 역량은 강좌와 사이드 프로젝트에서 왔으며, 프로덕션 소유 경험은 아직 없습니다. 그것이 제가 의도적으로 메우고 있는 격차입니다.",
    "skills.credentials": "자격",
    "skills.education": "학력",
    "cred.0.detail": "준비 중 - 아직 미취득",
    "edu.degree": "컴퓨터 공학 학사",
    "edu.grad": "2025년 7월 졸업",
    "contact.label": "연락처",
    "contact.h1": "뭔가를",
    "contact.h2": "망가뜨려요",
    "contact.blurb":
      "주니어 QA, 소프트웨어 엔지니어, DevOps 포지션, 그리고 테스팅, CI 파이프라인, 대시보드, 릴리스가 계속 밀리는 이유에 대한 대화를 환영합니다.",
    "footer.built": "Next.js, Motion, Three.js로 설계 및 구축",
    "ts.passing": "테스트 통과",
    "ts.failing": "테스트 실패",
    "bh.aria": "버그 발견? 버그 리포트 폼을 엽니다.",
    "bh.found": "버그 발견?",
    "bh.title": "버그 리포트",
    "bh.create": "이슈 만들기",
    "bh.summary": "요약",
    "bh.summaryValue": "포트폴리오 사이트의 숨겨진 버그",
    "bh.severity": "심각도",
    "bh.steps": "재현 단계",
    "bh.stepsValue": "1. 포트폴리오를 연다\n2. 맨 아래까지 스크롤\n3. 자세히 본다",
    "bh.expected": "기대 결과",
    "bh.expectedValue": "버그 없음. 당연히.",
    "bh.actual": "실제 결과",
    "bh.actualValue": "버그 있음. 찾으셨네요.",
    "bh.demo": "데모 전용 - 이 리포트는 브라우저를 떠나지 않습니다.",
    "bh.cancel": "취소",
    "bh.submit": "만들기",
    "bh.created": "이슈 생성됨",
    "bh.status": "상태",
    "bh.todo": "To Do",
    "bh.assignee": "담당자",
    "bh.assigneeValue": "Dani (커피 후 트리아지)",
    "bh.reporter": "보고자",
    "bh.reporterValue": "눈썰미 좋은 당신",
    "bh.note":
      "제가 좋아하는 버그 리포트 방식입니다: 재현 가능한 단계, 기대 대비 실제 결과, 정직한 심각도. 브라우저에만 저장됩니다.",
    "bh.done": "완료",
    "strategy.enOnly": "이 페이지는 영어로만 제공됩니다.",
  },

  zh: {
    "nav.about": "关于",
    "nav.experience": "经历",
    "nav.work": "作品",
    "nav.contact": "联系",
    "nav.hireme": "雇用我",
    "nav.mt": "机器翻译",
    "hero.tagline":
      "我在用户之前先破坏软件。我是一名QA工程师,正在为一款数百万人使用的移动银行应用工作,同时也在做侧项目,让自己永远不会停止破坏有趣的东西。",
    "hero.cv": "下载简历",
    "hero.scroll": "滚动探索",
    "sh.about.label": "关于",
    "sh.about.title": "对破坏也一丝不苟。",
    "sh.experience.label": "经历",
    "sh.experience.title": "我测试过的地方。",
    "sh.work.label": "精选作品",
    "sh.work.title": "我构建的东西。",
    "sh.practice.label": "QA实践",
    "sh.practice.title": "我实际的测试方式。",
    "sh.skills.label": "工具箱",
    "sh.skills.title": "我的测试工具。",
    "about.p1":
      "我是Dani,来自巴东的QA工程师,现居西雅加达。白天我测试 Livin' by Mandiri,一款数百万人信任并存放资金的移动银行应用,这意味着 bug 必须先过我这一关,才能到用户那里。",
    "about.p2":
      "我毕业于迪波内戈罗大学计算机工程专业,通过最诚实的路径进入QA:实习、测试用例和大量的回归周期。工作之余,我为自己关注的事物——森林火灾、地震、F1、英雄联盟——构建仪表板和追踪器,因为发布自己的项目能让我更好地测试别人的项目。",
    "stats.0.label": "移动银行与金融科技QA经验",
    "stats.1.label": "在真实银行应用上执行的测试用例",
    "stats.2.label": "端到端测试的生产发布",
    "stats.3.label": "我所在QA团队的人数",
    "exp.0.period": "2026年6月 - 至今",
    "exp.0.summary":
      "为数百万用户使用的移动银行应用 Livin' by Mandiri 做功能QA。在包括 KSM Emas、Bullion gold savings、Deeplink/Universal Link 和安全集成在内的10多个版本中进行回归、冒烟、UAT 和向后兼容性测试。在16人QA团队中通过 JIRA 报告和跟踪缺陷,并使用 Postman 和 SQL 验证API。",
    "exp.1.period": "2025年10月 - 2026年4月",
    "exp.1.summary":
      "为 HCI x OPPO 项目(包括 AVANTO)做端到端QA。执行 SIT、UAT、冒烟和回归周期;编写测试场景和测试用例,并推动其通过评审和批准。与 OPPO Mainland 进行每日 UAT 同步,沟通进展、发现和澄清事项。首次接触 Selenium 和 Katalon 测试自动化。",
    "exp.2.summary":
      "测试机构员工使用的内部信息系统,并编写配套的用户文档。",
    "work.live": "Live",
    "work.code": "代码",
    "work.strategy": "测试策略",
    "p.0.description":
      "英雄联盟全球总决赛实时追踪器:比赛中心、对阵图、排名、队伍页面、pick'em 和推送通知。基于 Supabase 的 Next.js PWA,每分钟同步官方 lolesports 数据源。",
    "p.1.description":
      "2026赛季 Formula 1 智能仪表板:日历、实时计时塔、排名、遥测实验室和轮胎策略。37个单元测试和10个 Playwright 端到端场景保证其准确性。",
    "p.2.description":
      "印度尼西亚森林和土地火灾监测:NASA FIRMS 热点、空气质量站点和建模烟雾羽流集中在一张地图上,通过无服务器函数代理。",
    "p.3.description":
      "实时地震仪表板,数据来自全球 USGS、印度尼西亚 BMKG 和日本 JMA,具有区域视图和60秒刷新。",
    "p.4.description":
      "ShelfSeeker 的 Playwright 端到端测试套件:在桌面和移动端模拟中运行39个测试,在 GitHub Actions 中执行,配有自动更新的报告仪表板和每次运行的 Allure 报告。",
    "p.5.description":
      "基于 OpenLibrary API 的移动优先图书查找 PWA:搜索、阅读清单、ISBN 条码扫描。大学期末项目。",
    "p.6.description":
      "Dewa Management 婚庆服务平台的 Flutter 移动应用,后端为 Laravel REST API。",
    "cs.0.title": "使用 Postman + Newman 在 CI 中进行API测试",
    "cs.0.context":
      "针对两个公开的 Formula 1 API (Jolpica 和 OpenF1) 的自主API测试练习,不涉及雇主或私有数据。",
    "cs.0.takeaway":
      "展示我的API测试设计方式:在真实数据上做真实断言,记录而非假设接口的怪癖,报告任何人都可以打开。",
    "cs.1.title": "使用 Playwright 对 ShelfSeeker 进行端到端测试",
    "cs.1.context":
      "为我自己的图书发现应用编写的完整E2E套件——39个测试在桌面 Chrome 和 Pixel 7 模拟中以78种组合在 GitHub Actions 中运行。",
    "cs.1.takeaway":
      "展示我对覆盖率的思考方式:用户流程优先于测试数量,一开始就诚实说明局限,结果无需翻CI日志即可查看。",
    "cs.2.title": "让实时数据应用保持诚实:APEX F1",
    "cs.2.context":
      "我的F1仪表板混合了来自多个数据源的实时、延迟、历史和演示数据——任何面板夸大其所知都会带来正确性风险。",
    "cs.2.takeaway":
      "展示我的测试直觉:代价最高的 bug 是软件看起来正确却在说假话。",
    "sg.0.title": "核心 QA",
    "sg.1.title": "工具",
    "sg.2.title": "代码与自动化",
    "skills.honest":
      "诚实说明:我的自动化技能来自课程和侧项目,尚非生产环境的所有权经验——这正是我有意弥补的差距。",
    "skills.credentials": "证书",
    "skills.education": "教育",
    "cred.0.detail": "准备中——尚未获得认证",
    "edu.degree": "计算机工程学士",
    "edu.grad": "2025年7月毕业",
    "contact.label": "联系",
    "contact.h1": "让我们来",
    "contact.h2": "破坏点什么",
    "contact.blurb":
      "欢迎初级QA、软件工程和 DevOps 职位的机会,也欢迎聊聊测试、CI 流水线、仪表板,或为什么你的发布总是一再延期。",
    "footer.built": "使用 Next.js、Motion 和 Three.js 设计与构建",
    "ts.passing": "测试通过",
    "ts.failing": "测试失败",
    "bh.aria": "发现 bug? 打开 bug 报告表单。",
    "bh.found": "发现 bug?",
    "bh.title": "Bug 报告",
    "bh.create": "创建问题",
    "bh.summary": "摘要",
    "bh.summaryValue": "作品集网站上的隐藏 bug",
    "bh.severity": "严重程度",
    "bh.steps": "复现步骤",
    "bh.stepsValue": "1. 打开作品集\n2. 滚动到最底部\n3. 仔细观察",
    "bh.expected": "预期结果",
    "bh.expectedValue": "没有 bug。显然。",
    "bh.actual": "实际结果",
    "bh.actualValue": "有一个 bug。被你找到了。",
    "bh.demo": "仅作演示——此报告不会离开你的浏览器。",
    "bh.cancel": "取消",
    "bh.submit": "创建",
    "bh.created": "问题已创建",
    "bh.status": "状态",
    "bh.todo": "To Do",
    "bh.assignee": "负责人",
    "bh.assigneeValue": "Dani(喝完咖啡后处理)",
    "bh.reporter": "报告人",
    "bh.reporterValue": "眼光敏锐的你",
    "bh.note":
      "这就是我喜欢的 bug 报告方式:可复现的步骤、预期与实际对比、诚实的严重程度。仅保存在你的浏览器中。",
    "bh.done": "完成",
    "strategy.enOnly": "此页面仅提供英文版本。",
  },
};

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  mt: boolean;
  /** Translate by key, falling back to the English literal in the component. */
  tx: (key: string, fallback: string) => string;
};

const Ctx = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  mt: false,
  tx: (_k, f) => f,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      // ?lang=xx wins so localized views can be linked directly.
      const q = new URLSearchParams(window.location.search).get("lang") as Lang | null;
      if (q && LANGS.some((l) => l.code === q)) {
        setLangState(q);
        localStorage.setItem("lang", q);
        return;
      }
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  const tx = (key: string, fallback: string) =>
    (lang !== "en" && DICT[lang]?.[key]) || fallback;

  const mt = LANGS.find((l) => l.code === lang)?.mt ?? false;

  return <Ctx.Provider value={{ lang, setLang, mt, tx }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
