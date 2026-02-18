/* Anti-Crash Spy Hook
   هذا السكربت مصمم ليتجاهل الأخطاء بدلاً من إغلاق التطبيق
*/
Java.perform(function () {
    // تغليف العملية كاملة لمنع أي انهيار مفاجئ
    try {
        var Cipher = Java.use("javax.crypto.Cipher");
        console.log("✅ [SAFE MODE] Spy Engine Attached...");

        Cipher.init.overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec').implementation = function (opmode, key, params) {
            
            // بداية منطقة الخطر - نستخدم Try Catch داخلي
            try {
                // 1. فحص هل المفتاح موجود أصلاً؟
                if (key !== null) {
                    var algo = key.getAlgorithm();
                    
                    // 2. هل هو AES؟
                    if (algo === "AES") {
                        var keyBytes = key.getEncoded();
                        
                        // 3. هل يمكن قراءة البايتات؟ (بعض المفاتيح محمية وتعود بـ null)
                        if (keyBytes !== null) {
                            var hexKey = Array.from(new Uint8Array(keyBytes)).map(b => b.toString(16).padStart(2, '0')).join('');
                            console.log("🔥🔥 [FOUND_KEY]: " + hexKey);
                        }
                    }
                }
            } catch (error) {
                // في حال حدوث خطأ، اطبعه في الكونسول ولا توقف التطبيق
                console.log("⚠️ [HANDLED ERROR]: " + error.message);
            }

            // أهم خطوة: إكمال عملية التطبيق الأصلية مهما حدث
            return this.init(opmode, key, params);
        };
    } catch (e) {
        console.log("❌ [FATAL ERROR]: Could not initialize hook: " + e.message);
    }
});
