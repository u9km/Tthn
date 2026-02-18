Java.perform(function () {
    var Cipher = Java.use("javax.crypto.Cipher");
    console.log("🚀 [PRO] Spy Tool Active... Waiting for the Key!");

    Cipher.init.overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec').implementation = function (opmode, key, params) {
        if (key.getAlgorithm() === "AES") {
            var keyBytes = key.getEncoded();
            var hexKey = "";
            for (var i = 0; i < keyBytes.length; i++) {
                hexKey += ("0" + (keyBytes[i] & 0xFF).toString(16)).slice(-2);
            }
            // هذا ما سيظهر لك في تيرمكس
            console.log("🔥🔥 [FOUND_KEY]: " + hexKey);
        }
        return this.init(opmode, key, params);
    };
});
