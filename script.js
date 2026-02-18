// Safe Mode Spy Hook: Prevents crashes on null keys
Java.perform(function () {
    try {
        var Cipher = Java.use("javax.crypto.Cipher");
        console.log("🚀 [PRO] Spy Engine Ready (Safe Mode)...");

        // هوك آمن لمنع الانهيار
        Cipher.init.overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec').implementation = function (opmode, key, params) {
            try {
                // تأكد أن المفتاح موجود وليس فارغاً
                if (key !== null) {
                    var algo = key.getAlgorithm();
                    
                    // التركيز فقط على AES وتجاهل الباقي لمنع التعارض
                    if (algo === "AES") {
                        var keyBytes = key.getEncoded();
                        
                        // فحص قاتل: إذا كان المفتاح محمياً ولا يمكن قراءته، لا تحاول تحويله
                        if (keyBytes !== null) {
                            var hexKey = Array.from(new Uint8Array(keyBytes)).map(b => b.toString(16).padStart(2, '0')).join('');
                            console.log("🔥🔥 [FOUND_KEY]: " + hexKey);
                        } else {
                            console.log("⚠️ [WARNING] Key found but it is protected (Hardware Backed).");
                        }
                    }
                }
            } catch (e) {
                // في حال حدوث خطأ، اطبع السبب ولا تغلق التطبيق
                console.log("❌ [ERROR] inside hook: " + e.message);
            }
            
            // أكمل عملية التطبيق الطبيعية حتى لو فشل التجسس
            return this.init(opmode, key, params);
        };
    } catch (e) {
        console.log("❌ [FATAL] Failed to install hook: " + e.message);
    }
});
