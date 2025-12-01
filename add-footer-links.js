import fs from 'fs';
import path from 'path';

const localesDir = './src/lib/i18n/locales';

const footerLinks = {
  en: {
    emailGenerator: "Email Generator",
    gmailGenerator: "Gmail Generator",
    tempMailEdu: "Temp Mail EDU",
    tenMinuteMail: "10 Minute Mail"
  },
  es: {
    emailGenerator: "Generador de Email",
    gmailGenerator: "Generador de Gmail",
    tempMailEdu: "Correo Temporal EDU",
    tenMinuteMail: "Correo de 10 Minutos"
  },
  de: {
    emailGenerator: "E-Mail-Generator",
    gmailGenerator: "Gmail-Generator",
    tempMailEdu: "Temporäre E-Mail EDU",
    tenMinuteMail: "10-Minuten-Mail"
  },
  fr: {
    emailGenerator: "Générateur d'Email",
    gmailGenerator: "Générateur Gmail",
    tempMailEdu: "Email Temporaire EDU",
    tenMinuteMail: "Mail de 10 Minutes"
  },
  pt: {
    emailGenerator: "Gerador de Email",
    gmailGenerator: "Gerador Gmail",
    tempMailEdu: "Email Temporário EDU",
    tenMinuteMail: "Email de 10 Minutos"
  },
  ar: {
    emailGenerator: "مولد البريد الإلكتروني",
    gmailGenerator: "مولد Gmail",
    tempMailEdu: "بريد مؤقت EDU",
    tenMinuteMail: "بريد 10 دقائق"
  },
  ru: {
    emailGenerator: "Генератор Email",
    gmailGenerator: "Генератор Gmail",
    tempMailEdu: "Временная почта EDU",
    tenMinuteMail: "Почта на 10 минут"
  }
};

Object.keys(footerLinks).forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Add footer links if they don't exist
    if (!data.footer.emailGenerator) {
      data.footer.emailGenerator = footerLinks[lang].emailGenerator;
      data.footer.gmailGenerator = footerLinks[lang].gmailGenerator;
      data.footer.tempMailEdu = footerLinks[lang].tempMailEdu;
      data.footer.tenMinuteMail = footerLinks[lang].tenMinuteMail;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Updated ${lang}.json with footer links`);
  } catch (error) {
    console.error(`❌ Error updating ${lang}.json:`, error.message);
  }
});

console.log('\n🎉 Footer links added to all languages!');
