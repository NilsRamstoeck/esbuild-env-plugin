// example.env
var env = { "MY_VAR": "Very important stuff" };
Object.entries(env).forEach(([key, value]) => process.env[key] = value);
var example_default = env;

// index.ts
console.log(example_default.MY_VAR, { env: example_default });
