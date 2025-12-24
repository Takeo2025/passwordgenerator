const pwcreate = document.querySelector('.create'); // ボタン
const pwresult = document.querySelector('.result'); // input
const pwcopy  = document.querySelector('.copy'); //コピー
const copyNameMail = document.querySelector('.submitName'); //氏名インプット
const createMail = document.querySelector('.Namecreate'); //氏名コピーボタン
const Mailtext = document.querySelector('.Email-line'); //メール文

function showExplain() {
    const explain = document.getElementById("explain");

    if (explain.style.display === "none") {
        explain.style.display = "block";
    } else {
        explain.style.display = "none";
    };
};

// ボタンをクリックしたらパスワード生成
pwcreate.addEventListener('click', () => {
   
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const numbers = '1234567890';
    const symbols = '!@#$%&*-_+=';
    const allletters = letters + numbers + symbols;
    
    let password = '';

    //必ず特殊記号を入れる
    const symbolIndex = Math.floor(Math.random() * symbols.length);
    password += symbols[symbolIndex];

    //残りの数字をランダムで取得
    for (let i = 0; i < 9; i++) { // 9文字のパスワード
    const randomIndex = Math.floor(Math.random() * allletters.length);
    password += allletters[randomIndex]; 
};
    //取得したパスワードをシャッフルする
    password = password.split('').sort(() => Math.random() - 0.5).join('');


    //結果の表示
    console.log(password); // 例: "A3B1C2"
    pwresult.value = password;
});


//コピーを押したときの動作
pwcopy.addEventListener('click', () => {
    const copyDo = pwresult.value;
    navigator.clipboard.writeText(copyDo);
    window.alert('コピーしました!');
});

//送信者の「生成」を押した時
createMail.addEventListener('click', () => {

    if (copyNameMail === "") {
        window.alert('必要情報を入力してください')
    };

    const Name =  copyNameMail.value;

    const date = document.querySelector('.date-line'); //日付インプットの取得

    const Realdate = new Date(date.value);
    const RepleceDate = (Realdate.getMonth() + 1 ) + '/' + Realdate.getDate();

    //const weekdayds = document.querySelector('.week-line');
    const createdays = new Date(date.value);
    const days = createdays.getDay();
    const weekbox = ["(月)", "(火)", "(水)", "(木)", "(金)", "(土)", "(日)",];
    const showweek = weekbox[days - 1];

    //メール本文テンプレート
    const mailtaxt = `スターティア株式会社 ご担当者様

いつもお世話になっております。
ドルニエメドテックジャパン IT部${Name}です。

添付のExcelをご参照いただき、福岡拠点VPNに以下のユーザーのご登録をお願いいたします。
${RepleceDate}${showweek}までにご対応いただけますと幸いです。

よろしくお願いいたします。`;

      //HTMLに出現させる
    Mailtext.value = mailtaxt;

    //HTMLからメールコピーボタンの呼び出し
    const MailBtn = document.querySelector('.mail-button');

    MailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(mailtaxt);
        window.alert('メール本文をコピーしました!');
    }, {once:true});

    navigator.clipboard.writeText(mailtaxt.replace(/<br>/g, '\n'));
});
