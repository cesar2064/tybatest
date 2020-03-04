import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({
    path: 'config.env'
});

let envConfig: dotenv.DotenvParseOutput;

try {
    envConfig = dotenv.parse(fs.readFileSync('config-overriding.env'));
} catch (e) {
    console.error(e);
}
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}