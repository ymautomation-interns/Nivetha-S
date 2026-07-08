const argon2=require("argon2");

async function generateHashes() {
    const adminPassword = "admin123";
    const userPassword = "user123";

    const adminHash = await argon2.hash(adminPassword);
    const userHash = await argon2.hash(userPassword);

    console.log("Admin Hash:");
    console.log(adminHash);

    console.log("\nUser Hash:");
    console.log(userHash);
}

generateHashes();