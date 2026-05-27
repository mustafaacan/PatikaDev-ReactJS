// For whole course --> https://www.skillcamp.dev/courses/react/realtime-arayuzun-hazirlanmasi

VIDEO LINKI
https://www.skillcamp.dev/courses/react/realtime-backend-veri-iletimi


CALISTIRMAK ICIN

Backend (node.js) uygulamasını çalıştır
Client(React uygulamasını çalıştır)

PROJENIN GENEL MANTIGI

Bu uygulamada amaç, seçilen rengin sadece o kullanıcıda değil, uygulamaya bağlı olan herkesin ekranında aynı anda güncellenmesi. Normal HTTP isteklerinde client bir istek atar, server cevap verir ve iş biter. Burada ise socket bağlantısı açık kalır; böylece client ve server birbirine olay bazlı olarak anlık mesaj gönderebilir.
Akış şu:
React uygulaması açılır.
Client, backend’deki socket sunucusuna bağlanır.
Backend, o ana kadarki son rengi client’a yollar.
Kullanıcı yeni renk seçip butona basar.
Client bu rengi backend’e gönderir.
Backend bu yeni rengi tüm bağlı client’lara yayınlar.
Herkesin ekranı aynı renge döner.
Bu akışın ana dosyaları:
Backend: app.js (line 1)
Client bağlantısı: socketApi.js (line 1)
Ana React ekranı: App.js (line 8)
Renk seçimi: Palatte.js (line 5)
1. socketApi.js içindeki io ile backend içindeki io arasındaki fark
İkisi aynı isimde ama aynı şey değiller.
Client tarafındaki io, socket.io-client paketinden gelir ve server’a bağlanmak için kullanılır.
Backend tarafındaki io, socket.io paketinden gelir ve socket sunucusunun kendisidir.
Client tarafı:
socketApi.js (line 8)
socket = io("http://localhost:3001", ...)
Buradaki io(...), “git backend’e bağlan” demektir.
Backend tarafı:
app.js (line 3)
const io = require("socket.io")(http);
Buradaki io, “HTTP server üstüne socket sunucusu kur” demektir.
Kısacası:
Client io: bağlanan taraf
Backend io: dinleyen ve yöneten taraf
2. socketApi.js içindeki .on ve .emit ne yapıyor
Socket iletişimi event mantığıyla çalışır. Yani bir isim verirsin, o isimle veri gönderirsin veya dinlersin.
emit
Bir event göndermek için kullanılır.
“Ben bir olay gönderiyorum” demektir.
Örnek:
socketApi.js (line 17)
socket.emit("newColor", color);
Anlamı: newColor adlı olayı backend’e gönder, yanında da color verisini taşı.
on
Bir event’i dinlemek için kullanılır.
“Bu isimle bir olay gelirse bunu çalıştır” demektir.
Örnek:
socketApi.js (line 21)
socket.on("receive", (color) => { ... })
Anlamı: backend’den receive adlı event gelirse içindeki color bilgisini al ve callback’i çalıştır.
Mantık şu kadar basit:
emit = gönder
on = dinle/yakala
3. Backend’de io. işlemleri ile socket. işlemleri arasındaki fark
Bu çok önemli bir ayrım.
io
Sunucunun genel socket yöneticisidir.
Tüm bağlantıları temsil eder.
Herkese yayın yapmak için uygundur.
Örnek:
app.js (line 23)
io.emit("receive", color);
Anlamı: bağlı olan herkese receive event’i gönder.
socket
Tek bir kullanıcı bağlantısını temsil eder.
O an bağlanan spesifik client’tır.
Sadece o kullanıcıdan veri almak veya sadece ona veri göndermek için kullanılır.
Örnekler:
app.js (line 17)

socket.emit("receive", lastColor);

Sadece yeni bağlanan kullanıcıya son rengi gönderir.

app.js (line 19)

socket.on("newColor", (color) => { ... })

Sadece o kullanıcıdan gelen newColor event’ini dinler.

Özet:
io = bütün kullanıcılar / genel yayın
socket = tek kullanıcı / o bağlantıya özel işlem
4. app.use(cors()) ne işe yarar
app.js (line 6)
Bu satır, farklı origin’den gelen isteklere izin vermek için kullanılır.
Bu projede muhtemelen:
React client localhost:3000
Backend localhost:3001
Tarayıcı bunları farklı origin sayar. Normalde güvenlik nedeniyle frontend’in backend’e doğrudan erişimi engellenebilir. cors() bunu açar.
Yani bu satırın amacı:
“Frontend başka portta olsa da backend’e erişebilsin.”
Özellikle geliştirme ortamında çok kullanılır.
5. app.get() ne işe yarar
app.js (line 8)
app.get(path, callback) bir HTTP GET endpoint’i tanımlar.
Bu örnekte:
app.get("/", (req, res) => { res.send("hello"); })
Anlamı:
Tarayıcıdan http://localhost:3001/ açılırsa backend "hello" döner.
Bu socket değildir. Bu normal HTTP route’tur.
Yani backend’de iki ayrı yapı birlikte var:
app.get(...) gibi klasik HTTP endpoint’leri
io.on(...) gibi socket event sistemi
6. "receive" ve "newColor" neyi ifade ediyor
Bunlar event isimleri. Yani geliştiricinin kendi verdiği mesaj adları.
"newColor": client’tan backend’e giden olay adı
"receive": backend’den client’lara giden olay adı
Örnek akış:
Client: socket.emit("newColor", color)
Backend bunu yakalar: socket.on("newColor", (color) => { ... })
Backend sonra yayın yapar: io.emit("receive", color)
Client bunu dinler: socket.on("receive", (color) => { ... })
Bunlar özel anahtar kelime değil. İstersen isimleri değiştirip:
"colorChanged"
"broadcastColor"
gibi başka isimler de verebilirsin.
Ama önemli olan şu:
Gönderen taraftaki event adı ile
Dinleyen taraftaki event adı
aynı olmalı.
Bu projede kullanılan önemli socket event’leri
"connection"
app.js (line 14)
Yeni bir client bağlandığında çalışır.
Bu, Socket.IO’nun hazır event’idir.

"disconnect"
app.js (line 26)
Client ayrıldığında çalışır.
Bu da hazır event’tir.

"newColor"
Kullanıcının yeni seçtiği rengi backend’e taşır.
Bu projeye özel event ismidir.

"receive"
Backend’in client’lara yeni rengi iletmesi için kullanılır.
Bu da projeye özel event ismidir.

Kodun Satır Satır Mantığı
Backend:
const app = require("express")();Express uygulaması oluşturur.

const http = require("http").createServer(app);Express app’i bir HTTP server içine alır.

const io = require("socket.io")(http);O HTTP server üstünde socket sistemi başlatılır.

let lastColor = "#282c34";Son seçilen renk hafızada tutulur.

io.on("connection", (socket) => { ... })Her yeni kullanıcı bağlantısında çalışır.

socket.emit("receive", lastColor);Yeni gelen kullanıcıya son durumu gönderir.

socket.on("newColor", (color) => { ... })Kullanıcı yeni renk yollarsa yakalar.

lastColor = color;Sunucudaki ortak state güncellenir.

io.emit("receive", color);Tüm client’lara yeni renk bildirilir.

Frontend:
init()Socket bağlantısını başlatır.

subscribe((color) => setActiveColor(color))Backend’den gelen rengi dinler.

send(color)Seçilen rengi backend’e yollar.

activeColorEkranda kullanılan güncel renktir.

Neden socket kullanılmış, neden normal HTTP değil
HTTP ile de renk değişimi gönderilebilirdi ama:
Herkesin anlık güncellenmesi zorlaşırdı.
Diğer kullanıcıların değişiklikleri sürekli polling ile kontrol edilmek zorunda kalırdı.
Gerçek zaman hissi azalırdı.
Socket burada şunu sağlar:
Bağlantı açık kalır
Server istediği anda client’a veri itebilir
Çok kullanıcılı senaryoda senkron görünüm elde edilir
Bu projede dikkat edilmesi gereken küçük noktalar
lastColor sadece sunucu belleğinde tutuluyor.
Backend kapanırsa renk bilgisi sıfırlanır.
Palatte.js (line 12) içinde input value olarak activeColor kullanıyor ama onChange ile local color state güncelleniyor; demo için çalışıyor ama yapı biraz karışık duruyor.
App.js (line 11) içinde socket aboneliği kuruluyor ama cleanup yok. Gerçek projede unmount sırasında listener temizlemek daha sağlıklı olur.
Kısacası bu proje sana şunu öğretmek için yazılmış:
Client socket ile server’a bağlanır
Event gönderir ve event dinler
Server tek kullanıcıya özel işlem de yapabilir, herkese yayın da yapabilir
Socket sayesinde uygulama gerçek zamanlı hale gelir

GENEL AKIŞ

1. Sayfa İlk Açıldığında
Backend ayağa kalkar.
app.js (line 12) içinde lastColor başlangıçta "#282c34" değerine sahiptir.
Bu anda sunucudaki ortak durum:
lastColor = "#282c34"

React uygulaması render olur.
App.js (line 9) içinde:
activeColor = "#282c34"
olur.
Ekranın arka planı da bu renktir.

useEffect bir kere çalışır.
App.js (line 11)
Burada iki şey yapılır:
init()
subscribe(...)

init() socket bağlantısını başlatır.
socketApi.js (line 5)
Burada:
socket = io("http://localhost:3001", { transports: ["websocket"] })
çalışır.
Yani client backend’e bağlanır.

Backend bu bağlantıyı yakalar.
app.js (line 14)
io.on("connection", (socket) => { ... })
çalışır.
Buradaki socket, yeni bağlanan kullanıcıya ait bağlantıdır.

Backend yeni bağlanan kullanıcıya mevcut rengi yollar.
app.js (line 17)
socket.emit("receive", lastColor)
çalışır.
O anda lastColor hala "#282c34" olduğu için backend client’a bunu gönderir.

Client receive event’ini dinlemektedir.
socketApi.js (line 21)
socket.on("receive", (color) => { cb(color); })
çalışır.

cb(color) aslında setActiveColor(color) çağırır.
App.js (line 14)
subscribe((color) => { setActiveColor(color); })
Burada activeColor yeniden güncellenir.
Değer değişimi:
önce activeColor = "#282c34"
sonra yine "#282c34" gelir
Yani ilk açılışta görünür bir fark olmayabilir, ama mantık kurulmuş olur.

2. Kullanıcı Input’tan Yeni Renk Seçtiğinde
Kullanıcı color input’tan bir renk seçer.
Palatte.js (line 10)
onChange={(e) => setColor(e.target.value)}
çalışır.

Burada değişen şey Palatte bileşeninin local state’idir.
Palatte.js (line 6)
Örneğin kullanıcı #ff0000 seçtiyse:
önce color = "#000"
sonra color = "#ff0000"

Bu aşamada henüz arka plan değişmez.
Çünkü arka planı belirleyen state activeColor’dır, color değil.
color sadece “gönderilmeye hazır seçili renk” gibi davranıyor.

3. Kullanıcı Butona Bastığında
Butonun onClick fonksiyonu çalışır.
Palatte.js (line 15)
send(color)

send(color) backend’e event yollar.
socketApi.js (line 17)
socket.emit("newColor", color)
Örneğin burada gönderilen veri:
event adı: "newColor"
payload: "#ff0000"

Backend bu event’i yakalar.
app.js (line 19)
socket.on("newColor", (color) => { ... })
çalışır.

Backend ortak state’i günceller.
app.js (line 22)
lastColor = color
Değer değişimi:
önce lastColor = "#282c34"
sonra lastColor = "#ff0000"

Backend yeni rengi herkese yayınlar.
app.js (line 23)
io.emit("receive", color)
Burada artık sadece butona basan kullanıcıya değil, tüm bağlı client’lara aynı event gider.

Tüm client’lar receive event’ini yakalar.
socketApi.js (line 22)
socket.on("receive", (color) => { cb(color); })

Her client kendi activeColor state’ini günceller.
App.js (line 15)
setActiveColor(color)

Ekran yeniden render olur.
App.js (line 20)
style={{ backgroundColor: activeColor }}
artık yeni rengi kullanır.
Değer değişimi:
önce activeColor = "#282c34"
sonra activeColor = "#ff0000"

Sonuç:
Uygulamayı açık olan herkesin ekran arka planı aynı anda #ff0000 olur.

4. İkinci Bir Kullanıcı Sonradan Bağlanırsa Ne Olur
Diyelim ilk kullanıcı rengi #ff0000 yaptı.
Sunucudaki ortak durum artık:
lastColor = "#ff0000"

İkinci kullanıcı uygulamayı açar.
Client yine init() ile bağlanır.

Backend yeni bağlantıyı görünce:
app.js (line 17)
socket.emit("receive", lastColor)
çalıştırır.

Bu kez gönderilen değer #282c34 değil, güncel olan #ff0000’dır.

Yeni gelen kullanıcı uygulamayı ilk açtığında bile doğru son rengi görür.

Bu çok önemli bir nokta: proje sadece yeni renkleri yayınlamıyor, yeni gelen kullanıcıya mevcut durumu da veriyor.
5. Değişen Verileri Kısa Tablo Gibi Düşünürsek
Başlangıç:
Backend lastColor = "#282c34"
Client activeColor = "#282c34"
Palatte içindeki color = "#000"
Kullanıcı input’tan #00ff00 seçince:
Backend lastColor değişmez
Client activeColor değişmez
Palatte.color = "#00ff00"
Kullanıcı butona basınca:
Backend lastColor = "#00ff00"
Tüm client’larda activeColor = "#00ff00"
Arka plan #00ff00
6. Bu Projeyi Zihninde Nasıl Oturtabilirsin
Bunu üç katman gibi düşünmek en rahat yol:
Palatte.js
Kullanıcının seçtiği rengi geçici olarak tutar ve gönderir.

socketApi.js
Client ile server arasındaki haberleşme köprüsüdür.
init() bağlanır
send() veri yollar
subscribe() veri dinler

backend/app.js
Ortak merkezi yönetir.
kim bağlandı
son renk ne
yeni renk gelirse herkese haber ver

7. En Kısa Özet
color = input’ta seçilen ama henüz yayınlanmamış değer
lastColor = backend’in tuttuğu ortak son değer
activeColor = ekranda o an görünen değer
socket.emit("newColor", color) = client backend’e “yeni renk bu” der
io.emit("receive", color) = backend herkese “güncel renk bu” der




HASSAS BIR BILGI

Client tarafındaki şu kod:
js



socket.on("connect", () =>
  console.log("Connection Established Successfully."),
);

şunu demek:
Client, backend’e başarıyla bağlanınca bu callback çalışsın.
Yani bu log, “bağlantı kuruldu” bilgisini client tarafında göstermek için var.
Backend’de neden birebir socket.on("connect") yok?
Çünkü connect client tarafında dinlenen hazır bir event’tir.
Backend tarafında bunun karşılığı genelde:js



io.on("connection", (socket) => { ... })


Yani mantıksal eşleşme var ama event isimleri birebir aynı kullanılmıyor.
Şöyle düşünebilirsin:
Client açısından olay: connect
Anlamı: “Ben sunucuya bağlandım.”
Server açısından olay: connection
Anlamı: “Bir client bana bağlandı.”
Bu yüzden:
socketApi.js (line 12) içindeki socket.on("connect", ...) client’ın kendi bağlantı başarısını dinliyor.
app.js (line 14) içindeki io.on("connection", ...) ise server’ın yeni gelen client bağlantısını dinliyor.
Kısacası burada eksik bir şey yok. connect ve connection Socket.IO’nun hazır lifecycle event’leri, newColor ve receive ise senin uygulamada tanımladığın custom event’ler.
Mini özet:
connect: client tarafında “bağlandım”
connection: server tarafında “biri bağlandı”
disconnect: iki tarafta da ayrılma durumunu yakalamak için kullanılan hazır event
İstersen bir sonraki mesajda sana “hazır event’ler” ve “custom event’ler” ayrımını küçük tablo


SORULAR

1) socketApi.js içindeki socket.on("receive"... nasıl çalışıyor ? bir fonksiyonda duruyor. fonksiyon çağırılmadan nasıl çalışır ? 
2) client app.js içindeki useEffect 1 kere çalışacak şekilde tanımlanmış. Değişimleri nasıl yakalıyor ?


Bu iki soru aslında socket mantığının kalbini açıyor. Buradaki kritik fikir şu: useEffect sadece bağlantıyı ve dinleyiciyi kuruyor, değişiklikleri yakalayan şey ise sonradan çalışan socket event listener.

1. socketApi.js içindeki socket.on("receive", ...) nasıl çalışıyor? Fonksiyonda duruyor, çağrılmadan nasıl çalışıyor?

Aslında o kod çağrılıyor. Dolaylı olarak.

App.js (line 12) içinde şu satır var:

subscribe((color) => {
  setActiveColor(color);
});
Bu satır çalıştığında socketApi.js (line 21) içindeki subscribe fonksiyonu çalışıyor:

export const subscribe = (cb) => {
  socket.on("receive", (color) => {
    console.log(color);
    cb(color);
  });
};
Yani burada olan şey şu:

subscribe(...) bir kere çağrılıyor.
Bu çağrı sırasında socket.on("receive", ...) kaydı yapılıyor.
Artık socket kütüphanesi şunu biliyor:
“Backend’den receive event’i gelirse bu fonksiyonu çalıştır.”
Burada socket.on(...) anında renk değiştirmiyor. Sadece bir dinleyici kaydediyor.

Sonra backend şu satırı çalıştırdığında:

io.emit("receive", color);
client tarafındaki kayıtlı listener tetikleniyor. Yani:

subscribe listener’ı kurar
io.emit o listener’ı tetikler
Şöyle düşünebilirsin:

socket.on(...) = kapıya zil takmak
io.emit(...) = zile basmak
callback = zil çalınca çalışan şey
Eğer subscribe(...) hiç çağrılmasaydı, socket.on("receive", ...) hiç kurulmazdı ve hiçbir değişiklik yakalanmazdı.

2. useEffect sadece 1 kere çalışıyorsa değişimleri nasıl yakalıyor?

Çünkü useEffect’in görevi değişimleri tek tek yakalamak değil, dinleme mekanizmasını başlatmak.

App.js (line 11) içinde:

useEffect(() => {
  init();

  subscribe((color) => {
    setActiveColor(color);
  });
}, []);
[] yüzünden bu effect sadece ilk render’dan sonra 1 kere çalışır. Bu tek çalışmada iki önemli şey olur:

init() socket bağlantısını açar
subscribe(...) ile receive event listener’ı kurulur
Sonra useEffect tekrar çalışmasa bile socket bağlantısı açık kalır ve listener bellekte yaşamaya devam eder. Backend her receive gönderdiğinde bu callback yeniden çalışır:

(color) => {
  setActiveColor(color);
}
Yani:

useEffect tekrar etmiyor
ama socket.on(...) içine verdiğin callback, event geldikçe tekrar tekrar çalışıyor
Bu çok önemli ayrım:

useEffect = kurulum
socket.on callback’i = olay geldikçe çalışan parça
Bu projede gerçek akış

Sayfa açılır
useEffect bir kere çalışır
init() bağlantıyı açar
subscribe(...) listener’ı kaydeder
Backend receive event’i yollar
socket.on("receive", ...) tetiklenir
setActiveColor(color) çalışır
React re-render yapar
Arka plan yeni renge döner
Yani değişimi yakalayan şey useEffect değil, socket.on("receive", ...) ile bir kere kurulmuş olan event listener’dır.