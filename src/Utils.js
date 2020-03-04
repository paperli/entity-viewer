export const isURL = (t) => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    return t.match(regex);
}

export const getUSDZ = (t, price = false) => {
    const reg = /\.(gltf|glb)$/gi;
    const suffix = price ? "#applePayButtonType=buy&checkoutTitle=Biplane%20Toy&checkoutSubtitle=Rustic%20finish%20with%20rotating%20propeller&price=$15" : "";
    return t.replace(reg, `.usdz${suffix}`);
}
  
export const getGithubRawURL = (t) => {
    t = t.replace("github.com", "raw.githubusercontent.com");
    t = t.replace("/blob/", "/");
    return t;
}

export const ltrim = (str) => {
    if(!str) return str;
    return str.replace(/\s+$/gi, '');
  }