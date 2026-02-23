#!/usr/bin/env python3
"""
Add homepage translation keys for:
1. How It Works section
2. When to Use / Real-World Examples section
3. Security & Privacy section
4. Limitations section

Then generate translations for all 7 non-English locales.
"""
import json, os, copy

LOCALES_DIR = "src/lib/i18n/locales"

# ============================================================
# ENGLISH KEYS
# ============================================================
new_home_keys = {
    "howItWorks": {
        "title": "🚀 How Fire Temp Mail Works - Step by Step",
        "subtitle": "Get your temporary email in seconds with our simple, no-registration process",
        "step1Title": "Instant Email Generation",
        "step1Text": "The moment you visit Fire Temp Mail, we automatically generate a fresh temporary email address for you. No sign-up forms, no personal information required, no waiting—just instant access.",
        "step2Title": "Copy Your Temporary Email",
        "step2Text": "Click the copy button to save your disposable email address to your clipboard. You can use this email anywhere you need to provide an email address for signups, downloads, or verifications.",
        "step3Title": "Receive Emails Instantly",
        "step3Text": "All emails sent to your temporary address appear in your inbox within seconds. View, read, and forward them as needed. The inbox updates automatically in real-time.",
        "step4Title": "Auto-Deletion for Privacy",
        "step4Text": "Your temporary emails are automatically deleted after 24 hours, leaving no trace. Your privacy is protected by design—no logs, no tracking, no permanent storage."
    },
    "useCases": {
        "title": "💡 When to Use Fire Temp Mail: Real-World Examples",
        "subtitle": "See how our users protect their privacy in everyday situations",
        "gaming": {
            "title": "Gaming Platform Signups",
            "scenario": "You want to try a new online game but don't want gaming newsletters cluttering your inbox.",
            "solution": "Use Fire Temp Mail for the signup, verify your gaming account, and keep your real email spam-free. Perfect for trying multiple game platforms without commitment."
        },
        "downloads": {
            "title": "Downloading Free Resources",
            "scenario": "A website offers a free eBook, template, or software download but requires email registration.",
            "solution": "Use a temporary email to get the download link without joining their mailing list. Get your resource and move on without future marketing emails."
        },
        "shopping": {
            "title": "One-Time Shopping Discounts",
            "scenario": "An online store offers 10% off for first-time email subscribers, but you don't want daily promotional emails.",
            "solution": "Get your discount code with a disposable email. Enjoy the savings without the spam."
        },
        "developer": {
            "title": "Developer Testing & QA",
            "scenario": "You're testing email functionality in your app and need multiple email addresses for different test scenarios.",
            "solution": "Generate unlimited temporary emails for testing user registration, email verification, notification systems, and password recovery—all without managing real accounts."
        },
        "social": {
            "title": "Social Media Trial Accounts",
            "scenario": "You want to check out a social platform before committing with your real email.",
            "solution": "Create a trial account with a temporary email. If you like the platform, you can always create a permanent account later with your real email."
        },
        "contests": {
            "title": "Contest & Giveaway Entries",
            "scenario": "You want to enter online contests but worry about spam from contest sponsors.",
            "solution": "Use Fire Temp Mail for contest entries. If you win, you'll get the notification; if not, no spam follows you."
        }
    },
    "security": {
        "title": "🔒 How We Protect Your Privacy & Security",
        "subtitle": "Your anonymity is our top priority. Here's how we keep you safe.",
        "zeroLog": {
            "title": "Zero Data Logging",
            "text": "We don't log IP addresses, track user behavior, or store personal information. Your usage is completely anonymous. We have no way to trace temporary emails back to individual users."
        },
        "autoDeletion": {
            "title": "Automatic Deletion",
            "text": "All emails are automatically deleted after 24 hours maximum. No permanent storage means no data breaches. Even if someone wanted to access your old emails, they're already gone."
        },
        "noRegistration": {
            "title": "No Registration Required",
            "text": "We never ask for your name, email, phone number, or any personal information. Just instant access to temporary email addresses. No account means no data to compromise."
        },
        "spamFilter": {
            "title": "Spam & Malware Filtering",
            "text": "Basic spam protection filters out malicious emails while allowing legitimate messages through. Suspicious attachments and phishing attempts are automatically blocked."
        },
        "encryption": {
            "title": "HTTPS Encryption",
            "text": "All connections to Fire Temp Mail use HTTPS encryption. Your communication with our servers is secure and cannot be intercepted by third parties."
        },
        "noTracking": {
            "title": "No Third-Party Tracking",
            "text": "We don't use intrusive tracking cookies or share data with advertisers. Your browsing remains private while using our service."
        }
    },
    "limitations": {
        "title": "⚠️ Important: What Fire Temp Mail Is NOT For",
        "subtitle": "Be honest with yourself: temporary emails have limitations. Here's what you need to know.",
        "neverUseTitle": "Never Use Temporary Emails For:",
        "banking": "Banking or Financial Accounts:",
        "bankingText": "You need permanent access to these accounts. Password resets and security notifications won't reach you if the email is deleted.",
        "socialMedia": "Primary Social Media:",
        "socialMediaText": "Facebook, Instagram, Twitter, LinkedIn—use your real email. You'll need it for account recovery.",
        "workSchool": "Work or School Email:",
        "workSchoolText": "Important communications need to be permanent and reliable.",
        "government": "Government Services:",
        "governmentText": "Tax filings, benefits, official documents—these require permanent email addresses.",
        "healthcare": "Healthcare Portals:",
        "healthcareText": "Medical information and appointment reminders are too important for temporary emails.",
        "ecommerce": "E-commerce Accounts:",
        "ecommerceText": "If you plan to make purchases or track orders, use your real email for order confirmations and customer support.",
        "whyNot": "Why Not?",
        "whyNotText": "Temporary emails are deleted automatically after 24 hours. If you need to recover your account, reset your password, or access important notifications later, you won't receive those emails. Use Fire Temp Mail only for non-critical, temporary needs.",
        "otherLimitations": "📧 Other Important Limitations:",
        "cannotSend": "Cannot Send Emails:",
        "cannotSendText": "Fire Temp Mail is receive-only. You can read incoming emails but cannot send replies or compose new messages.",
        "lifetime": "24-Hour Lifetime:",
        "lifetimeText": "Emails are kept for 24 hours maximum. After that, they're permanently deleted with no way to recover them.",
        "attachments": "No Attachments Security:",
        "attachmentsText": "While we filter malware, we cannot guarantee 100% safety. Don't open suspicious attachments.",
        "blocked": "Some Sites Block Temp Emails:",
        "blockedText": "Services like PayPal, banks, and some social platforms detect and block temporary email domains.",
        "noForwarding": "No Email Forwarding:",
        "noForwardingText": "You can view emails in our interface, but cannot automatically forward them to your real email.",
        "perfectForTitle": "✅ Fire Temp Mail IS Perfect For:",
        "perfectFor1": "Free trial signups (streaming services, software)",
        "perfectFor2": "Downloading resources (eBooks, templates, guides)",
        "perfectFor3": "Newsletter signups you're unsure about",
        "perfectFor4": "Forum and community registrations",
        "perfectFor5": "Contest and giveaway entries",
        "perfectFor6": "Testing and development work",
        "perfectFor7": "One-time verifications",
        "perfectFor8": "Privacy protection on untrusted websites"
    }
}

# ============================================================
# TRANSLATIONS
# ============================================================
translations = {
    "es": {
        "howItWorks": {
            "title": "🚀 Cómo funciona Fire Temp Mail - Paso a paso",
            "subtitle": "Obtén tu correo temporal en segundos con nuestro proceso simple, sin registro",
            "step1Title": "Generación instantánea de correo",
            "step1Text": "En el momento que visitas Fire Temp Mail, generamos automáticamente una dirección de correo temporal nueva para ti. Sin formularios de registro, sin información personal requerida, sin esperas—solo acceso instantáneo.",
            "step2Title": "Copia tu correo temporal",
            "step2Text": "Haz clic en el botón de copiar para guardar tu dirección de correo desechable en el portapapeles. Puedes usar este correo en cualquier lugar donde necesites proporcionar una dirección de correo para registros, descargas o verificaciones.",
            "step3Title": "Recibe correos al instante",
            "step3Text": "Todos los correos enviados a tu dirección temporal aparecen en tu bandeja de entrada en segundos. Visualiza, lee y reenvíalos según necesites. La bandeja se actualiza automáticamente en tiempo real.",
            "step4Title": "Auto-eliminación por privacidad",
            "step4Text": "Tus correos temporales se eliminan automáticamente después de 24 horas, sin dejar rastro. Tu privacidad está protegida por diseño—sin registros, sin seguimiento, sin almacenamiento permanente."
        },
        "useCases": {
            "title": "💡 Cuándo usar Fire Temp Mail: Ejemplos reales",
            "subtitle": "Descubre cómo nuestros usuarios protegen su privacidad en situaciones cotidianas",
            "gaming": {
                "title": "Registros en plataformas de juegos",
                "scenario": "Quieres probar un nuevo juego en línea pero no quieres que los boletines de juegos llenen tu bandeja.",
                "solution": "Usa Fire Temp Mail para el registro, verifica tu cuenta de juego y mantén tu correo real libre de spam. Perfecto para probar múltiples plataformas de juegos sin compromiso."
            },
            "downloads": {
                "title": "Descarga de recursos gratuitos",
                "scenario": "Un sitio web ofrece un eBook, plantilla o software gratuito pero requiere registro por correo.",
                "solution": "Usa un correo temporal para obtener el enlace de descarga sin unirte a su lista de correo. Obtén tu recurso y sigue adelante sin futuros correos de marketing."
            },
            "shopping": {
                "title": "Descuentos de compra únicos",
                "scenario": "Una tienda en línea ofrece 10% de descuento para nuevos suscriptores por correo, pero no quieres correos promocionales diarios.",
                "solution": "Obtén tu código de descuento con un correo desechable. Disfruta del ahorro sin el spam."
            },
            "developer": {
                "title": "Pruebas de desarrollo y QA",
                "scenario": "Estás probando la funcionalidad de correo en tu app y necesitas múltiples direcciones para diferentes escenarios de prueba.",
                "solution": "Genera correos temporales ilimitados para probar registro de usuarios, verificación de correo, sistemas de notificación y recuperación de contraseña—todo sin gestionar cuentas reales."
            },
            "social": {
                "title": "Cuentas de prueba en redes sociales",
                "scenario": "Quieres explorar una plataforma social antes de comprometerte con tu correo real.",
                "solution": "Crea una cuenta de prueba con un correo temporal. Si te gusta la plataforma, siempre puedes crear una cuenta permanente después con tu correo real."
            },
            "contests": {
                "title": "Participación en concursos y sorteos",
                "scenario": "Quieres participar en concursos en línea pero te preocupa el spam de los patrocinadores.",
                "solution": "Usa Fire Temp Mail para participar. Si ganas, recibirás la notificación; si no, ningún spam te seguirá."
            }
        },
        "security": {
            "title": "🔒 Cómo protegemos tu privacidad y seguridad",
            "subtitle": "Tu anonimato es nuestra máxima prioridad. Así es como te mantenemos seguro.",
            "zeroLog": {
                "title": "Cero registro de datos",
                "text": "No registramos direcciones IP, no rastreamos comportamiento de usuarios ni almacenamos información personal. Tu uso es completamente anónimo. No tenemos forma de rastrear correos temporales hasta usuarios individuales."
            },
            "autoDeletion": {
                "title": "Eliminación automática",
                "text": "Todos los correos se eliminan automáticamente después de 24 horas máximo. Sin almacenamiento permanente significa sin filtraciones de datos. Incluso si alguien quisiera acceder a tus correos antiguos, ya no existen."
            },
            "noRegistration": {
                "title": "Sin registro requerido",
                "text": "Nunca pedimos tu nombre, correo, número de teléfono ni ninguna información personal. Solo acceso instantáneo a direcciones de correo temporales. Sin cuenta significa sin datos que comprometer."
            },
            "spamFilter": {
                "title": "Filtrado de spam y malware",
                "text": "La protección básica contra spam filtra correos maliciosos mientras permite los legítimos. Los archivos adjuntos sospechosos y los intentos de phishing se bloquean automáticamente."
            },
            "encryption": {
                "title": "Cifrado HTTPS",
                "text": "Todas las conexiones a Fire Temp Mail usan cifrado HTTPS. Tu comunicación con nuestros servidores es segura y no puede ser interceptada por terceros."
            },
            "noTracking": {
                "title": "Sin rastreo de terceros",
                "text": "No usamos cookies de rastreo intrusivas ni compartimos datos con anunciantes. Tu navegación permanece privada mientras usas nuestro servicio."
            }
        },
        "limitations": {
            "title": "⚠️ Importante: Para qué NO es Fire Temp Mail",
            "subtitle": "Sé honesto contigo mismo: los correos temporales tienen limitaciones. Esto es lo que necesitas saber.",
            "neverUseTitle": "Nunca uses correos temporales para:",
            "banking": "Cuentas bancarias o financieras:",
            "bankingText": "Necesitas acceso permanente a estas cuentas. Los restablecimientos de contraseña y las notificaciones de seguridad no te llegarán si el correo se elimina.",
            "socialMedia": "Redes sociales principales:",
            "socialMediaText": "Facebook, Instagram, Twitter, LinkedIn—usa tu correo real. Lo necesitarás para recuperar tu cuenta.",
            "workSchool": "Correo de trabajo o escuela:",
            "workSchoolText": "Las comunicaciones importantes necesitan ser permanentes y confiables.",
            "government": "Servicios gubernamentales:",
            "governmentText": "Declaraciones de impuestos, beneficios, documentos oficiales—estos requieren direcciones de correo permanentes.",
            "healthcare": "Portales de salud:",
            "healthcareText": "La información médica y los recordatorios de citas son demasiado importantes para correos temporales.",
            "ecommerce": "Cuentas de comercio electrónico:",
            "ecommerceText": "Si planeas hacer compras o rastrear pedidos, usa tu correo real para confirmaciones de pedido y soporte al cliente.",
            "whyNot": "¿Por qué no?",
            "whyNotText": "Los correos temporales se eliminan automáticamente después de 24 horas. Si necesitas recuperar tu cuenta, restablecer tu contraseña o acceder a notificaciones importantes después, no recibirás esos correos. Usa Fire Temp Mail solo para necesidades temporales y no críticas.",
            "otherLimitations": "📧 Otras limitaciones importantes:",
            "cannotSend": "No puede enviar correos:",
            "cannotSendText": "Fire Temp Mail es solo de recepción. Puedes leer correos entrantes pero no puedes enviar respuestas ni redactar nuevos mensajes.",
            "lifetime": "Vida útil de 24 horas:",
            "lifetimeText": "Los correos se mantienen por 24 horas máximo. Después de eso, se eliminan permanentemente sin forma de recuperarlos.",
            "attachments": "Sin seguridad de adjuntos:",
            "attachmentsText": "Aunque filtramos malware, no podemos garantizar 100% de seguridad. No abras archivos adjuntos sospechosos.",
            "blocked": "Algunos sitios bloquean correos temporales:",
            "blockedText": "Servicios como PayPal, bancos y algunas plataformas sociales detectan y bloquean dominios de correo temporal.",
            "noForwarding": "Sin reenvío de correo:",
            "noForwardingText": "Puedes ver correos en nuestra interfaz, pero no puedes reenviarlos automáticamente a tu correo real.",
            "perfectForTitle": "✅ Fire Temp Mail ES perfecto para:",
            "perfectFor1": "Registros de prueba gratuita (servicios de streaming, software)",
            "perfectFor2": "Descarga de recursos (eBooks, plantillas, guías)",
            "perfectFor3": "Suscripciones a boletines de los que no estás seguro",
            "perfectFor4": "Registros en foros y comunidades",
            "perfectFor5": "Participación en concursos y sorteos",
            "perfectFor6": "Trabajo de pruebas y desarrollo",
            "perfectFor7": "Verificaciones únicas",
            "perfectFor8": "Protección de privacidad en sitios web no confiables"
        }
    },
    "de": {
        "howItWorks": {
            "title": "🚀 So funktioniert Fire Temp Mail – Schritt für Schritt",
            "subtitle": "Erhalten Sie Ihre temporäre E-Mail in Sekunden mit unserem einfachen, registrierungsfreien Prozess",
            "step1Title": "Sofortige E-Mail-Generierung",
            "step1Text": "Sobald Sie Fire Temp Mail besuchen, generieren wir automatisch eine neue temporäre E-Mail-Adresse für Sie. Keine Anmeldeformulare, keine persönlichen Daten erforderlich, kein Warten – einfach sofortiger Zugang.",
            "step2Title": "Kopieren Sie Ihre temporäre E-Mail",
            "step2Text": "Klicken Sie auf die Kopier-Schaltfläche, um Ihre Wegwerf-E-Mail-Adresse in die Zwischenablage zu speichern. Sie können diese E-Mail überall verwenden, wo Sie eine E-Mail-Adresse für Anmeldungen, Downloads oder Verifizierungen angeben müssen.",
            "step3Title": "E-Mails sofort empfangen",
            "step3Text": "Alle E-Mails an Ihre temporäre Adresse erscheinen innerhalb von Sekunden in Ihrem Posteingang. Anzeigen, lesen und weiterleiten nach Bedarf. Der Posteingang aktualisiert sich automatisch in Echtzeit.",
            "step4Title": "Auto-Löschung für Privatsphäre",
            "step4Text": "Ihre temporären E-Mails werden nach 24 Stunden automatisch gelöscht, ohne Spuren zu hinterlassen. Ihre Privatsphäre ist von Grund auf geschützt – keine Protokolle, kein Tracking, keine dauerhafte Speicherung."
        },
        "useCases": {
            "title": "💡 Wann Sie Fire Temp Mail nutzen sollten: Praxisbeispiele",
            "subtitle": "Erfahren Sie, wie unsere Nutzer ihre Privatsphäre im Alltag schützen",
            "gaming": {
                "title": "Gaming-Plattform-Anmeldungen",
                "scenario": "Sie möchten ein neues Online-Spiel ausprobieren, wollen aber keine Gaming-Newsletter in Ihrem Posteingang.",
                "solution": "Verwenden Sie Fire Temp Mail für die Anmeldung, verifizieren Sie Ihr Spielkonto und halten Sie Ihre echte E-Mail spamfrei. Perfekt zum Testen mehrerer Spielplattformen ohne Verpflichtung."
            },
            "downloads": {
                "title": "Kostenlose Ressourcen herunterladen",
                "scenario": "Eine Website bietet ein kostenloses eBook, eine Vorlage oder einen Software-Download an, erfordert aber eine E-Mail-Registrierung.",
                "solution": "Verwenden Sie eine temporäre E-Mail, um den Download-Link zu erhalten, ohne der Mailingliste beizutreten. Holen Sie sich Ihre Ressource und machen Sie weiter ohne zukünftige Marketing-E-Mails."
            },
            "shopping": {
                "title": "Einmalige Einkaufsrabatte",
                "scenario": "Ein Online-Shop bietet 10% Rabatt für Erstabonnenten, aber Sie möchten keine täglichen Werbe-E-Mails.",
                "solution": "Holen Sie sich Ihren Rabattcode mit einer Wegwerf-E-Mail. Genießen Sie die Ersparnis ohne den Spam."
            },
            "developer": {
                "title": "Entwickler-Tests & QA",
                "scenario": "Sie testen E-Mail-Funktionalitäten in Ihrer App und benötigen mehrere E-Mail-Adressen für verschiedene Testszenarien.",
                "solution": "Generieren Sie unbegrenzt temporäre E-Mails zum Testen von Benutzerregistrierung, E-Mail-Verifizierung, Benachrichtigungssystemen und Passwortwiederherstellung – alles ohne echte Konten zu verwalten."
            },
            "social": {
                "title": "Social-Media-Testkonten",
                "scenario": "Sie möchten eine Social-Media-Plattform ausprobieren, bevor Sie Ihre echte E-Mail angeben.",
                "solution": "Erstellen Sie ein Testkonto mit einer temporären E-Mail. Wenn Ihnen die Plattform gefällt, können Sie später jederzeit ein dauerhaftes Konto mit Ihrer echten E-Mail erstellen."
            },
            "contests": {
                "title": "Gewinnspiel- & Wettbewerbsteilnahmen",
                "scenario": "Sie möchten an Online-Gewinnspielen teilnehmen, befürchten aber Spam von den Sponsoren.",
                "solution": "Verwenden Sie Fire Temp Mail für Gewinnspielteilnahmen. Wenn Sie gewinnen, erhalten Sie die Benachrichtigung; wenn nicht, folgt Ihnen kein Spam."
            }
        },
        "security": {
            "title": "🔒 So schützen wir Ihre Privatsphäre & Sicherheit",
            "subtitle": "Ihre Anonymität hat höchste Priorität. So halten wir Sie sicher.",
            "zeroLog": {
                "title": "Null Datenprotokollierung",
                "text": "Wir protokollieren keine IP-Adressen, verfolgen kein Nutzerverhalten und speichern keine persönlichen Daten. Ihre Nutzung ist völlig anonym. Wir haben keine Möglichkeit, temporäre E-Mails zu einzelnen Nutzern zurückzuverfolgen."
            },
            "autoDeletion": {
                "title": "Automatische Löschung",
                "text": "Alle E-Mails werden nach maximal 24 Stunden automatisch gelöscht. Keine dauerhafte Speicherung bedeutet keine Datenlecks. Selbst wenn jemand auf Ihre alten E-Mails zugreifen wollte, sind sie bereits verschwunden."
            },
            "noRegistration": {
                "title": "Keine Registrierung erforderlich",
                "text": "Wir fragen nie nach Ihrem Namen, Ihrer E-Mail, Telefonnummer oder persönlichen Informationen. Einfach sofortiger Zugang zu temporären E-Mail-Adressen. Kein Konto bedeutet keine Daten, die kompromittiert werden können."
            },
            "spamFilter": {
                "title": "Spam- & Malware-Filterung",
                "text": "Der grundlegende Spamschutz filtert bösartige E-Mails heraus und lässt legitime Nachrichten durch. Verdächtige Anhänge und Phishing-Versuche werden automatisch blockiert."
            },
            "encryption": {
                "title": "HTTPS-Verschlüsselung",
                "text": "Alle Verbindungen zu Fire Temp Mail verwenden HTTPS-Verschlüsselung. Ihre Kommunikation mit unseren Servern ist sicher und kann nicht von Dritten abgefangen werden."
            },
            "noTracking": {
                "title": "Kein Drittanbieter-Tracking",
                "text": "Wir verwenden keine aufdringlichen Tracking-Cookies und teilen keine Daten mit Werbetreibenden. Ihr Surfen bleibt privat, während Sie unseren Dienst nutzen."
            }
        },
        "limitations": {
            "title": "⚠️ Wichtig: Wofür Fire Temp Mail NICHT gedacht ist",
            "subtitle": "Seien Sie ehrlich: Temporäre E-Mails haben Einschränkungen. Das müssen Sie wissen.",
            "neverUseTitle": "Verwenden Sie temporäre E-Mails niemals für:",
            "banking": "Bank- oder Finanzkonten:",
            "bankingText": "Sie benötigen dauerhaften Zugang zu diesen Konten. Passwort-Zurücksetzungen und Sicherheitsbenachrichtigungen erreichen Sie nicht, wenn die E-Mail gelöscht wird.",
            "socialMedia": "Primäre Social Media:",
            "socialMediaText": "Facebook, Instagram, Twitter, LinkedIn – verwenden Sie Ihre echte E-Mail. Sie benötigen sie zur Kontowiederherstellung.",
            "workSchool": "Arbeits- oder Schul-E-Mail:",
            "workSchoolText": "Wichtige Kommunikation muss dauerhaft und zuverlässig sein.",
            "government": "Behördliche Dienste:",
            "governmentText": "Steuererklärungen, Leistungen, offizielle Dokumente – diese erfordern permanente E-Mail-Adressen.",
            "healthcare": "Gesundheitsportale:",
            "healthcareText": "Medizinische Informationen und Terminhinweise sind zu wichtig für temporäre E-Mails.",
            "ecommerce": "E-Commerce-Konten:",
            "ecommerceText": "Wenn Sie Einkäufe tätigen oder Bestellungen verfolgen möchten, verwenden Sie Ihre echte E-Mail für Bestellbestätigungen und Kundensupport.",
            "whyNot": "Warum nicht?",
            "whyNotText": "Temporäre E-Mails werden nach 24 Stunden automatisch gelöscht. Wenn Sie Ihr Konto wiederherstellen, Ihr Passwort zurücksetzen oder später auf wichtige Benachrichtigungen zugreifen müssen, werden Sie diese E-Mails nicht erhalten. Verwenden Sie Fire Temp Mail nur für nicht-kritische, temporäre Bedürfnisse.",
            "otherLimitations": "📧 Weitere wichtige Einschränkungen:",
            "cannotSend": "Kann keine E-Mails senden:",
            "cannotSendText": "Fire Temp Mail ist nur für den Empfang. Sie können eingehende E-Mails lesen, aber keine Antworten senden oder neue Nachrichten verfassen.",
            "lifetime": "24-Stunden-Lebensdauer:",
            "lifetimeText": "E-Mails werden maximal 24 Stunden aufbewahrt. Danach werden sie dauerhaft gelöscht ohne Möglichkeit der Wiederherstellung.",
            "attachments": "Keine Anhangssicherheit:",
            "attachmentsText": "Obwohl wir Malware filtern, können wir keine 100%ige Sicherheit garantieren. Öffnen Sie keine verdächtigen Anhänge.",
            "blocked": "Einige Seiten blockieren Temp-E-Mails:",
            "blockedText": "Dienste wie PayPal, Banken und einige soziale Plattformen erkennen und blockieren temporäre E-Mail-Domains.",
            "noForwarding": "Keine E-Mail-Weiterleitung:",
            "noForwardingText": "Sie können E-Mails in unserer Oberfläche ansehen, aber nicht automatisch an Ihre echte E-Mail weiterleiten.",
            "perfectForTitle": "✅ Fire Temp Mail IST perfekt für:",
            "perfectFor1": "Kostenlose Probe-Anmeldungen (Streaming-Dienste, Software)",
            "perfectFor2": "Ressourcen herunterladen (eBooks, Vorlagen, Anleitungen)",
            "perfectFor3": "Newsletter-Anmeldungen, bei denen Sie unsicher sind",
            "perfectFor4": "Forum- und Community-Registrierungen",
            "perfectFor5": "Gewinnspiel- und Wettbewerbsteilnahmen",
            "perfectFor6": "Test- und Entwicklungsarbeit",
            "perfectFor7": "Einmalige Verifizierungen",
            "perfectFor8": "Privatsphärenschutz auf nicht vertrauenswürdigen Websites"
        }
    },
    "fr": {
        "howItWorks": {
            "title": "🚀 Comment fonctionne Fire Temp Mail – Étape par étape",
            "subtitle": "Obtenez votre email temporaire en quelques secondes avec notre processus simple, sans inscription",
            "step1Title": "Génération instantanée d'email",
            "step1Text": "Dès que vous visitez Fire Temp Mail, nous générons automatiquement une nouvelle adresse email temporaire pour vous. Pas de formulaires d'inscription, pas d'informations personnelles requises, pas d'attente — juste un accès instantané.",
            "step2Title": "Copiez votre email temporaire",
            "step2Text": "Cliquez sur le bouton copier pour enregistrer votre adresse email jetable dans votre presse-papiers. Vous pouvez utiliser cet email partout où vous devez fournir une adresse pour des inscriptions, téléchargements ou vérifications.",
            "step3Title": "Recevez des emails instantanément",
            "step3Text": "Tous les emails envoyés à votre adresse temporaire apparaissent dans votre boîte de réception en quelques secondes. Consultez, lisez et transférez-les selon vos besoins. La boîte se met à jour automatiquement en temps réel.",
            "step4Title": "Suppression automatique pour la confidentialité",
            "step4Text": "Vos emails temporaires sont automatiquement supprimés après 24 heures, sans laisser de trace. Votre vie privée est protégée par conception — pas de journaux, pas de suivi, pas de stockage permanent."
        },
        "useCases": {
            "title": "💡 Quand utiliser Fire Temp Mail : Exemples concrets",
            "subtitle": "Découvrez comment nos utilisateurs protègent leur vie privée au quotidien",
            "gaming": {
                "title": "Inscriptions aux plateformes de jeux",
                "scenario": "Vous voulez essayer un nouveau jeu en ligne mais ne voulez pas que les newsletters de jeux encombrent votre boîte.",
                "solution": "Utilisez Fire Temp Mail pour l'inscription, vérifiez votre compte de jeu et gardez votre vrai email sans spam. Parfait pour essayer plusieurs plateformes sans engagement."
            },
            "downloads": {
                "title": "Téléchargement de ressources gratuites",
                "scenario": "Un site web propose un eBook, modèle ou logiciel gratuit mais nécessite une inscription par email.",
                "solution": "Utilisez un email temporaire pour obtenir le lien de téléchargement sans rejoindre leur liste de diffusion. Obtenez votre ressource et passez à autre chose sans futurs emails marketing."
            },
            "shopping": {
                "title": "Remises d'achat ponctuelles",
                "scenario": "Une boutique en ligne offre 10% de réduction pour les nouveaux abonnés par email, mais vous ne voulez pas d'emails promotionnels quotidiens.",
                "solution": "Obtenez votre code de réduction avec un email jetable. Profitez des économies sans le spam."
            },
            "developer": {
                "title": "Tests de développement et QA",
                "scenario": "Vous testez les fonctionnalités email dans votre app et avez besoin de plusieurs adresses pour différents scénarios de test.",
                "solution": "Générez des emails temporaires illimités pour tester l'inscription utilisateur, la vérification email, les systèmes de notification et la récupération de mot de passe — le tout sans gérer de vrais comptes."
            },
            "social": {
                "title": "Comptes d'essai sur les réseaux sociaux",
                "scenario": "Vous voulez découvrir une plateforme sociale avant de vous engager avec votre vrai email.",
                "solution": "Créez un compte d'essai avec un email temporaire. Si la plateforme vous plaît, vous pourrez toujours créer un compte permanent plus tard avec votre vrai email."
            },
            "contests": {
                "title": "Participations aux concours et tirages",
                "scenario": "Vous voulez participer à des concours en ligne mais craignez le spam des sponsors.",
                "solution": "Utilisez Fire Temp Mail pour les participations aux concours. Si vous gagnez, vous recevrez la notification ; sinon, aucun spam ne vous suivra."
            }
        },
        "security": {
            "title": "🔒 Comment nous protégeons votre vie privée et sécurité",
            "subtitle": "Votre anonymat est notre priorité absolue. Voici comment nous vous protégeons.",
            "zeroLog": {
                "title": "Zéro journalisation de données",
                "text": "Nous ne journalisons pas les adresses IP, ne suivons pas le comportement des utilisateurs et ne stockons pas d'informations personnelles. Votre utilisation est totalement anonyme. Nous n'avons aucun moyen de relier les emails temporaires à des utilisateurs individuels."
            },
            "autoDeletion": {
                "title": "Suppression automatique",
                "text": "Tous les emails sont automatiquement supprimés après 24 heures maximum. Pas de stockage permanent signifie pas de violations de données. Même si quelqu'un voulait accéder à vos anciens emails, ils sont déjà supprimés."
            },
            "noRegistration": {
                "title": "Aucune inscription requise",
                "text": "Nous ne demandons jamais votre nom, email, numéro de téléphone ou toute information personnelle. Juste un accès instantané aux adresses email temporaires. Pas de compte signifie pas de données à compromettre."
            },
            "spamFilter": {
                "title": "Filtrage spam et malware",
                "text": "La protection anti-spam de base filtre les emails malveillants tout en laissant passer les messages légitimes. Les pièces jointes suspectes et les tentatives de phishing sont automatiquement bloquées."
            },
            "encryption": {
                "title": "Chiffrement HTTPS",
                "text": "Toutes les connexions à Fire Temp Mail utilisent le chiffrement HTTPS. Votre communication avec nos serveurs est sécurisée et ne peut pas être interceptée par des tiers."
            },
            "noTracking": {
                "title": "Aucun suivi tiers",
                "text": "Nous n'utilisons pas de cookies de suivi intrusifs et ne partageons pas de données avec les annonceurs. Votre navigation reste privée lorsque vous utilisez notre service."
            }
        },
        "limitations": {
            "title": "⚠️ Important : Ce pour quoi Fire Temp Mail N'EST PAS fait",
            "subtitle": "Soyez honnête : les emails temporaires ont des limites. Voici ce que vous devez savoir.",
            "neverUseTitle": "N'utilisez jamais les emails temporaires pour :",
            "banking": "Comptes bancaires ou financiers :",
            "bankingText": "Vous avez besoin d'un accès permanent à ces comptes. Les réinitialisations de mot de passe et les notifications de sécurité ne vous parviendront pas si l'email est supprimé.",
            "socialMedia": "Réseaux sociaux principaux :",
            "socialMediaText": "Facebook, Instagram, Twitter, LinkedIn — utilisez votre vrai email. Vous en aurez besoin pour la récupération de compte.",
            "workSchool": "Email professionnel ou scolaire :",
            "workSchoolText": "Les communications importantes doivent être permanentes et fiables.",
            "government": "Services gouvernementaux :",
            "governmentText": "Déclarations fiscales, prestations, documents officiels — ceux-ci nécessitent des adresses email permanentes.",
            "healthcare": "Portails de santé :",
            "healthcareText": "Les informations médicales et les rappels de rendez-vous sont trop importants pour des emails temporaires.",
            "ecommerce": "Comptes e-commerce :",
            "ecommerceText": "Si vous prévoyez de faire des achats ou de suivre des commandes, utilisez votre vrai email pour les confirmations et le support client.",
            "whyNot": "Pourquoi pas ?",
            "whyNotText": "Les emails temporaires sont supprimés automatiquement après 24 heures. Si vous devez récupérer votre compte, réinitialiser votre mot de passe ou accéder à des notifications importantes plus tard, vous ne recevrez pas ces emails. Utilisez Fire Temp Mail uniquement pour des besoins temporaires et non critiques.",
            "otherLimitations": "📧 Autres limitations importantes :",
            "cannotSend": "Impossible d'envoyer des emails :",
            "cannotSendText": "Fire Temp Mail est en réception uniquement. Vous pouvez lire les emails entrants mais ne pouvez pas envoyer de réponses ni rédiger de nouveaux messages.",
            "lifetime": "Durée de vie de 24 heures :",
            "lifetimeText": "Les emails sont conservés 24 heures maximum. Après cela, ils sont définitivement supprimés sans possibilité de récupération.",
            "attachments": "Pas de sécurité des pièces jointes :",
            "attachmentsText": "Bien que nous filtrons les malwares, nous ne pouvons pas garantir une sécurité à 100%. N'ouvrez pas les pièces jointes suspectes.",
            "blocked": "Certains sites bloquent les emails temporaires :",
            "blockedText": "Des services comme PayPal, les banques et certaines plateformes sociales détectent et bloquent les domaines d'email temporaires.",
            "noForwarding": "Pas de transfert d'email :",
            "noForwardingText": "Vous pouvez consulter les emails dans notre interface, mais ne pouvez pas les transférer automatiquement vers votre vrai email.",
            "perfectForTitle": "✅ Fire Temp Mail EST parfait pour :",
            "perfectFor1": "Inscriptions d'essai gratuit (services de streaming, logiciels)",
            "perfectFor2": "Téléchargement de ressources (eBooks, modèles, guides)",
            "perfectFor3": "Inscriptions aux newsletters dont vous n'êtes pas sûr",
            "perfectFor4": "Inscriptions aux forums et communautés",
            "perfectFor5": "Participations aux concours et tirages",
            "perfectFor6": "Travail de test et développement",
            "perfectFor7": "Vérifications ponctuelles",
            "perfectFor8": "Protection de la vie privée sur les sites non fiables"
        }
    },
    "pt": {
        "howItWorks": {
            "title": "🚀 Como o Fire Temp Mail funciona - Passo a passo",
            "subtitle": "Obtenha seu email temporário em segundos com nosso processo simples, sem registro",
            "step1Title": "Geração instantânea de email",
            "step1Text": "No momento em que você visita o Fire Temp Mail, geramos automaticamente um novo endereço de email temporário para você. Sem formulários de cadastro, sem informações pessoais necessárias, sem espera — apenas acesso instantâneo.",
            "step2Title": "Copie seu email temporário",
            "step2Text": "Clique no botão copiar para salvar seu endereço de email descartável na área de transferência. Você pode usar este email em qualquer lugar onde precise fornecer um endereço para cadastros, downloads ou verificações.",
            "step3Title": "Receba emails instantaneamente",
            "step3Text": "Todos os emails enviados para seu endereço temporário aparecem na sua caixa de entrada em segundos. Visualize, leia e encaminhe conforme necessário. A caixa de entrada atualiza automaticamente em tempo real.",
            "step4Title": "Auto-exclusão para privacidade",
            "step4Text": "Seus emails temporários são automaticamente excluídos após 24 horas, sem deixar rastros. Sua privacidade é protegida por design — sem logs, sem rastreamento, sem armazenamento permanente."
        },
        "useCases": {
            "title": "💡 Quando usar o Fire Temp Mail: Exemplos reais",
            "subtitle": "Veja como nossos usuários protegem sua privacidade em situações cotidianas",
            "gaming": {
                "title": "Cadastros em plataformas de jogos",
                "scenario": "Você quer experimentar um novo jogo online mas não quer newsletters de jogos enchendo sua caixa de entrada.",
                "solution": "Use o Fire Temp Mail para o cadastro, verifique sua conta de jogo e mantenha seu email real livre de spam. Perfeito para experimentar múltiplas plataformas de jogos sem compromisso."
            },
            "downloads": {
                "title": "Download de recursos gratuitos",
                "scenario": "Um site oferece um eBook, template ou software gratuito mas exige registro por email.",
                "solution": "Use um email temporário para obter o link de download sem entrar na lista de emails. Pegue seu recurso e siga em frente sem futuros emails de marketing."
            },
            "shopping": {
                "title": "Descontos de compra únicos",
                "scenario": "Uma loja online oferece 10% de desconto para novos assinantes por email, mas você não quer emails promocionais diários.",
                "solution": "Obtenha seu código de desconto com um email descartável. Aproveite a economia sem o spam."
            },
            "developer": {
                "title": "Testes de desenvolvimento e QA",
                "scenario": "Você está testando funcionalidades de email no seu app e precisa de múltiplos endereços para diferentes cenários de teste.",
                "solution": "Gere emails temporários ilimitados para testar registro de usuários, verificação de email, sistemas de notificação e recuperação de senha — tudo sem gerenciar contas reais."
            },
            "social": {
                "title": "Contas de teste em redes sociais",
                "scenario": "Você quer conhecer uma plataforma social antes de se comprometer com seu email real.",
                "solution": "Crie uma conta de teste com um email temporário. Se gostar da plataforma, você sempre pode criar uma conta permanente depois com seu email real."
            },
            "contests": {
                "title": "Participação em concursos e sorteios",
                "scenario": "Você quer participar de concursos online mas se preocupa com spam dos patrocinadores.",
                "solution": "Use o Fire Temp Mail para participar de concursos. Se você ganhar, receberá a notificação; se não, nenhum spam te seguirá."
            }
        },
        "security": {
            "title": "🔒 Como protegemos sua privacidade e segurança",
            "subtitle": "Seu anonimato é nossa prioridade máxima. Veja como mantemos você seguro.",
            "zeroLog": {
                "title": "Zero registro de dados",
                "text": "Não registramos endereços IP, não rastreamos comportamento de usuários nem armazenamos informações pessoais. Seu uso é completamente anônimo. Não temos como rastrear emails temporários até usuários individuais."
            },
            "autoDeletion": {
                "title": "Exclusão automática",
                "text": "Todos os emails são automaticamente excluídos após no máximo 24 horas. Sem armazenamento permanente significa sem vazamentos de dados. Mesmo que alguém quisesse acessar seus emails antigos, eles já não existem."
            },
            "noRegistration": {
                "title": "Sem registro necessário",
                "text": "Nunca pedimos seu nome, email, número de telefone ou qualquer informação pessoal. Apenas acesso instantâneo a endereços de email temporários. Sem conta significa sem dados para comprometer."
            },
            "spamFilter": {
                "title": "Filtragem de spam e malware",
                "text": "A proteção básica contra spam filtra emails maliciosos enquanto permite mensagens legítimas. Anexos suspeitos e tentativas de phishing são automaticamente bloqueados."
            },
            "encryption": {
                "title": "Criptografia HTTPS",
                "text": "Todas as conexões com o Fire Temp Mail usam criptografia HTTPS. Sua comunicação com nossos servidores é segura e não pode ser interceptada por terceiros."
            },
            "noTracking": {
                "title": "Sem rastreamento de terceiros",
                "text": "Não usamos cookies de rastreamento intrusivos nem compartilhamos dados com anunciantes. Sua navegação permanece privada enquanto usa nosso serviço."
            }
        },
        "limitations": {
            "title": "⚠️ Importante: Para que o Fire Temp Mail NÃO serve",
            "subtitle": "Seja honesto consigo mesmo: emails temporários têm limitações. Aqui está o que você precisa saber.",
            "neverUseTitle": "Nunca use emails temporários para:",
            "banking": "Contas bancárias ou financeiras:",
            "bankingText": "Você precisa de acesso permanente a essas contas. Redefinições de senha e notificações de segurança não chegarão se o email for excluído.",
            "socialMedia": "Redes sociais principais:",
            "socialMediaText": "Facebook, Instagram, Twitter, LinkedIn — use seu email real. Você precisará dele para recuperação de conta.",
            "workSchool": "Email de trabalho ou escola:",
            "workSchoolText": "Comunicações importantes precisam ser permanentes e confiáveis.",
            "government": "Serviços governamentais:",
            "governmentText": "Declarações de impostos, benefícios, documentos oficiais — estes exigem endereços de email permanentes.",
            "healthcare": "Portais de saúde:",
            "healthcareText": "Informações médicas e lembretes de consultas são importantes demais para emails temporários.",
            "ecommerce": "Contas de e-commerce:",
            "ecommerceText": "Se você planeja fazer compras ou rastrear pedidos, use seu email real para confirmações de pedido e suporte ao cliente.",
            "whyNot": "Por que não?",
            "whyNotText": "Emails temporários são excluídos automaticamente após 24 horas. Se você precisar recuperar sua conta, redefinir sua senha ou acessar notificações importantes depois, não receberá esses emails. Use o Fire Temp Mail apenas para necessidades temporárias e não críticas.",
            "otherLimitations": "📧 Outras limitações importantes:",
            "cannotSend": "Não pode enviar emails:",
            "cannotSendText": "O Fire Temp Mail é apenas para recebimento. Você pode ler emails recebidos mas não pode enviar respostas nem compor novas mensagens.",
            "lifetime": "Vida útil de 24 horas:",
            "lifetimeText": "Os emails são mantidos por no máximo 24 horas. Depois disso, são permanentemente excluídos sem forma de recuperá-los.",
            "attachments": "Sem segurança de anexos:",
            "attachmentsText": "Embora filtremos malware, não podemos garantir 100% de segurança. Não abra anexos suspeitos.",
            "blocked": "Alguns sites bloqueiam emails temporários:",
            "blockedText": "Serviços como PayPal, bancos e algumas plataformas sociais detectam e bloqueiam domínios de email temporário.",
            "noForwarding": "Sem encaminhamento de email:",
            "noForwardingText": "Você pode ver emails em nossa interface, mas não pode encaminhá-los automaticamente para seu email real.",
            "perfectForTitle": "✅ O Fire Temp Mail É perfeito para:",
            "perfectFor1": "Cadastros de teste gratuito (serviços de streaming, software)",
            "perfectFor2": "Download de recursos (eBooks, templates, guias)",
            "perfectFor3": "Assinaturas de newsletters sobre as quais você não tem certeza",
            "perfectFor4": "Registros em fóruns e comunidades",
            "perfectFor5": "Participação em concursos e sorteios",
            "perfectFor6": "Trabalho de testes e desenvolvimento",
            "perfectFor7": "Verificações únicas",
            "perfectFor8": "Proteção de privacidade em sites não confiáveis"
        }
    },
    "ar": {
        "howItWorks": {
            "title": "🚀 كيف يعمل Fire Temp Mail - خطوة بخطوة",
            "subtitle": "احصل على بريدك الإلكتروني المؤقت في ثوانٍ مع عمليتنا البسيطة بدون تسجيل",
            "step1Title": "إنشاء بريد إلكتروني فوري",
            "step1Text": "في اللحظة التي تزور فيها Fire Temp Mail، نقوم تلقائياً بإنشاء عنوان بريد إلكتروني مؤقت جديد لك. لا نماذج تسجيل، لا معلومات شخصية مطلوبة، لا انتظار - مجرد وصول فوري.",
            "step2Title": "انسخ بريدك الإلكتروني المؤقت",
            "step2Text": "انقر على زر النسخ لحفظ عنوان بريدك الإلكتروني المؤقت في الحافظة. يمكنك استخدام هذا البريد في أي مكان تحتاج فيه لتقديم عنوان بريد للتسجيلات أو التنزيلات أو التحققات.",
            "step3Title": "استقبال الرسائل فوراً",
            "step3Text": "جميع الرسائل المرسلة إلى عنوانك المؤقت تظهر في صندوق الوارد خلال ثوانٍ. اعرض واقرأ وأعد توجيهها حسب الحاجة. يتم تحديث صندوق الوارد تلقائياً في الوقت الفعلي.",
            "step4Title": "الحذف التلقائي للخصوصية",
            "step4Text": "يتم حذف رسائلك الإلكترونية المؤقتة تلقائياً بعد 24 ساعة، دون ترك أي أثر. خصوصيتك محمية بالتصميم - لا سجلات، لا تتبع، لا تخزين دائم."
        },
        "useCases": {
            "title": "💡 متى تستخدم Fire Temp Mail: أمثلة واقعية",
            "subtitle": "شاهد كيف يحمي مستخدمونا خصوصيتهم في المواقف اليومية",
            "gaming": {
                "title": "التسجيل في منصات الألعاب",
                "scenario": "تريد تجربة لعبة جديدة عبر الإنترنت لكن لا تريد نشرات الألعاب تملأ صندوق الوارد.",
                "solution": "استخدم Fire Temp Mail للتسجيل، تحقق من حساب اللعبة، وحافظ على بريدك الحقيقي خالياً من الرسائل المزعجة. مثالي لتجربة منصات ألعاب متعددة بدون التزام."
            },
            "downloads": {
                "title": "تنزيل الموارد المجانية",
                "scenario": "يقدم موقع ويب كتاباً إلكترونياً أو قالباً أو برنامجاً مجانياً لكن يتطلب التسجيل بالبريد الإلكتروني.",
                "solution": "استخدم بريداً إلكترونياً مؤقتاً للحصول على رابط التنزيل دون الانضمام لقائمتهم البريدية. احصل على موردك وامضِ قدماً بدون رسائل تسويقية مستقبلية."
            },
            "shopping": {
                "title": "خصومات التسوق لمرة واحدة",
                "scenario": "يقدم متجر على الإنترنت خصم 10% للمشتركين الجدد بالبريد الإلكتروني، لكنك لا تريد رسائل ترويجية يومية.",
                "solution": "احصل على رمز الخصم ببريد إلكتروني مؤقت. استمتع بالتوفير بدون الرسائل المزعجة."
            },
            "developer": {
                "title": "اختبار التطوير وضمان الجودة",
                "scenario": "أنت تختبر وظائف البريد الإلكتروني في تطبيقك وتحتاج عناوين متعددة لسيناريوهات اختبار مختلفة.",
                "solution": "أنشئ رسائل بريد مؤقتة غير محدودة لاختبار تسجيل المستخدمين، التحقق من البريد، أنظمة الإشعارات واستعادة كلمة المرور - كل ذلك بدون إدارة حسابات حقيقية."
            },
            "social": {
                "title": "حسابات تجريبية على وسائل التواصل",
                "scenario": "تريد استكشاف منصة اجتماعية قبل الالتزام ببريدك الحقيقي.",
                "solution": "أنشئ حساباً تجريبياً ببريد مؤقت. إذا أعجبتك المنصة، يمكنك دائماً إنشاء حساب دائم لاحقاً ببريدك الحقيقي."
            },
            "contests": {
                "title": "المشاركة في المسابقات والسحوبات",
                "scenario": "تريد المشاركة في مسابقات عبر الإنترنت لكن تقلق من الرسائل المزعجة من الرعاة.",
                "solution": "استخدم Fire Temp Mail للمشاركة في المسابقات. إذا فزت، ستحصل على الإشعار؛ وإن لم تفز، لن تتبعك رسائل مزعجة."
            }
        },
        "security": {
            "title": "🔒 كيف نحمي خصوصيتك وأمانك",
            "subtitle": "عدم الكشف عن هويتك هو أولويتنا القصوى. إليك كيف نحافظ على سلامتك.",
            "zeroLog": {
                "title": "صفر تسجيل للبيانات",
                "text": "لا نسجل عناوين IP، لا نتتبع سلوك المستخدمين، ولا نخزن معلومات شخصية. استخدامك مجهول تماماً. ليس لدينا طريقة لتتبع الرسائل المؤقتة إلى مستخدمين فرديين."
            },
            "autoDeletion": {
                "title": "الحذف التلقائي",
                "text": "يتم حذف جميع الرسائل تلقائياً بعد 24 ساعة كحد أقصى. عدم وجود تخزين دائم يعني عدم وجود خروقات بيانات. حتى لو أراد شخص ما الوصول إلى رسائلك القديمة، فقد اختفت بالفعل."
            },
            "noRegistration": {
                "title": "لا تسجيل مطلوب",
                "text": "لا نطلب أبداً اسمك أو بريدك الإلكتروني أو رقم هاتفك أو أي معلومات شخصية. مجرد وصول فوري لعناوين البريد المؤقتة. لا حساب يعني لا بيانات يمكن اختراقها."
            },
            "spamFilter": {
                "title": "تصفية الرسائل المزعجة والبرمجيات الخبيثة",
                "text": "الحماية الأساسية ضد الرسائل المزعجة تصفي الرسائل الخبيثة مع السماح بالرسائل الشرعية. المرفقات المشبوهة ومحاولات التصيد يتم حظرها تلقائياً."
            },
            "encryption": {
                "title": "تشفير HTTPS",
                "text": "جميع الاتصالات بـ Fire Temp Mail تستخدم تشفير HTTPS. اتصالك بخوادمنا آمن ولا يمكن اعتراضه من قبل أطراف ثالثة."
            },
            "noTracking": {
                "title": "لا تتبع من أطراف ثالثة",
                "text": "لا نستخدم ملفات تتبع متطفلة ولا نشارك البيانات مع المعلنين. تصفحك يبقى خاصاً أثناء استخدام خدمتنا."
            }
        },
        "limitations": {
            "title": "⚠️ مهم: ما الذي لا يصلح له Fire Temp Mail",
            "subtitle": "كن صادقاً مع نفسك: البريد المؤقت له حدود. إليك ما تحتاج معرفته.",
            "neverUseTitle": "لا تستخدم البريد المؤقت أبداً لـ:",
            "banking": "الحسابات المصرفية أو المالية:",
            "bankingText": "تحتاج وصولاً دائماً لهذه الحسابات. إعادة تعيين كلمة المرور وإشعارات الأمان لن تصلك إذا تم حذف البريد.",
            "socialMedia": "وسائل التواصل الاجتماعي الرئيسية:",
            "socialMediaText": "فيسبوك، إنستغرام، تويتر، لينكد إن — استخدم بريدك الحقيقي. ستحتاجه لاستعادة الحساب.",
            "workSchool": "البريد الإلكتروني للعمل أو المدرسة:",
            "workSchoolText": "الاتصالات المهمة يجب أن تكون دائمة وموثوقة.",
            "government": "الخدمات الحكومية:",
            "governmentText": "الإقرارات الضريبية، المزايا، المستندات الرسمية — هذه تتطلب عناوين بريد دائمة.",
            "healthcare": "بوابات الرعاية الصحية:",
            "healthcareText": "المعلومات الطبية وتذكيرات المواعيد أهم من أن تكون في بريد مؤقت.",
            "ecommerce": "حسابات التجارة الإلكترونية:",
            "ecommerceText": "إذا كنت تخطط للشراء أو تتبع الطلبات، استخدم بريدك الحقيقي لتأكيدات الطلب ودعم العملاء.",
            "whyNot": "لماذا لا؟",
            "whyNotText": "يتم حذف البريد المؤقت تلقائياً بعد 24 ساعة. إذا احتجت لاستعادة حسابك أو إعادة تعيين كلمة المرور أو الوصول لإشعارات مهمة لاحقاً، لن تستقبل تلك الرسائل. استخدم Fire Temp Mail فقط للاحتياجات المؤقتة وغير الحرجة.",
            "otherLimitations": "📧 قيود مهمة أخرى:",
            "cannotSend": "لا يمكن إرسال رسائل:",
            "cannotSendText": "Fire Temp Mail للاستقبال فقط. يمكنك قراءة الرسائل الواردة لكن لا يمكنك إرسال ردود أو كتابة رسائل جديدة.",
            "lifetime": "عمر افتراضي 24 ساعة:",
            "lifetimeText": "يتم الاحتفاظ بالرسائل لمدة 24 ساعة كحد أقصى. بعد ذلك، يتم حذفها نهائياً بدون طريقة لاستعادتها.",
            "attachments": "لا أمان للمرفقات:",
            "attachmentsText": "بينما نقوم بتصفية البرمجيات الخبيثة، لا يمكننا ضمان أمان 100%. لا تفتح المرفقات المشبوهة.",
            "blocked": "بعض المواقع تحجب البريد المؤقت:",
            "blockedText": "خدمات مثل PayPal والبنوك وبعض المنصات الاجتماعية تكتشف وتحجب نطاقات البريد المؤقت.",
            "noForwarding": "لا إعادة توجيه للبريد:",
            "noForwardingText": "يمكنك عرض الرسائل في واجهتنا، لكن لا يمكنك إعادة توجيهها تلقائياً إلى بريدك الحقيقي.",
            "perfectForTitle": "✅ Fire Temp Mail مثالي لـ:",
            "perfectFor1": "تسجيلات الفترة التجريبية المجانية (خدمات البث، البرامج)",
            "perfectFor2": "تنزيل الموارد (الكتب الإلكترونية، القوالب، الأدلة)",
            "perfectFor3": "الاشتراك في النشرات التي لست متأكداً منها",
            "perfectFor4": "التسجيل في المنتديات والمجتمعات",
            "perfectFor5": "المشاركة في المسابقات والسحوبات",
            "perfectFor6": "أعمال الاختبار والتطوير",
            "perfectFor7": "التحققات لمرة واحدة",
            "perfectFor8": "حماية الخصوصية على المواقع غير الموثوقة"
        }
    },
    "ru": {
        "howItWorks": {
            "title": "🚀 Как работает Fire Temp Mail — пошагово",
            "subtitle": "Получите временную почту за секунды с нашим простым процессом без регистрации",
            "step1Title": "Мгновенная генерация email",
            "step1Text": "В момент посещения Fire Temp Mail мы автоматически создаём новый временный email-адрес для вас. Никаких форм регистрации, никакой личной информации, никакого ожидания — просто мгновенный доступ.",
            "step2Title": "Скопируйте вашу временную почту",
            "step2Text": "Нажмите кнопку копирования, чтобы сохранить ваш одноразовый email в буфер обмена. Используйте этот email везде, где нужно указать адрес для регистраций, загрузок или верификаций.",
            "step3Title": "Получайте письма мгновенно",
            "step3Text": "Все письма на ваш временный адрес появляются в почтовом ящике за секунды. Просматривайте, читайте и пересылайте по мере необходимости. Почтовый ящик обновляется автоматически в реальном времени.",
            "step4Title": "Автоудаление для конфиденциальности",
            "step4Text": "Ваши временные письма автоматически удаляются через 24 часа, не оставляя следов. Ваша конфиденциальность защищена изначально — без логов, без отслеживания, без постоянного хранения."
        },
        "useCases": {
            "title": "💡 Когда использовать Fire Temp Mail: реальные примеры",
            "subtitle": "Узнайте, как наши пользователи защищают свою конфиденциальность в повседневных ситуациях",
            "gaming": {
                "title": "Регистрация на игровых платформах",
                "scenario": "Вы хотите попробовать новую онлайн-игру, но не хотите, чтобы игровые рассылки засоряли вашу почту.",
                "solution": "Используйте Fire Temp Mail для регистрации, подтвердите игровой аккаунт и сохраните реальную почту свободной от спама. Идеально для тестирования нескольких игровых платформ без обязательств."
            },
            "downloads": {
                "title": "Скачивание бесплатных ресурсов",
                "scenario": "Сайт предлагает бесплатную электронную книгу, шаблон или программу, но требует регистрацию по email.",
                "solution": "Используйте временный email для получения ссылки на скачивание без подписки на рассылку. Получите свой ресурс и двигайтесь дальше без будущих маркетинговых писем."
            },
            "shopping": {
                "title": "Разовые скидки на покупки",
                "scenario": "Интернет-магазин предлагает скидку 10% для новых подписчиков, но вы не хотите ежедневных рекламных писем.",
                "solution": "Получите свой промокод с одноразовой почтой. Наслаждайтесь экономией без спама."
            },
            "developer": {
                "title": "Тестирование и контроль качества",
                "scenario": "Вы тестируете функции email в приложении и вам нужно несколько адресов для разных тестовых сценариев.",
                "solution": "Генерируйте неограниченное количество временных email для тестирования регистрации пользователей, верификации email, систем уведомлений и восстановления пароля — всё без управления реальными аккаунтами."
            },
            "social": {
                "title": "Пробные аккаунты в соцсетях",
                "scenario": "Вы хотите ознакомиться с социальной платформой, прежде чем указывать свою настоящую почту.",
                "solution": "Создайте пробный аккаунт с временной почтой. Если платформа понравится, вы всегда можете создать постоянный аккаунт позже с настоящей почтой."
            },
            "contests": {
                "title": "Участие в конкурсах и розыгрышах",
                "scenario": "Вы хотите участвовать в онлайн-конкурсах, но беспокоитесь о спаме от спонсоров.",
                "solution": "Используйте Fire Temp Mail для участия в конкурсах. Если выиграете, получите уведомление; если нет, спам вас не преследует."
            }
        },
        "security": {
            "title": "🔒 Как мы защищаем вашу конфиденциальность и безопасность",
            "subtitle": "Ваша анонимность — наш главный приоритет. Вот как мы обеспечиваем вашу безопасность.",
            "zeroLog": {
                "title": "Нулевое логирование данных",
                "text": "Мы не записываем IP-адреса, не отслеживаем поведение пользователей и не храним личную информацию. Ваше использование полностью анонимно. У нас нет способа связать временные email с конкретными пользователями."
            },
            "autoDeletion": {
                "title": "Автоматическое удаление",
                "text": "Все письма автоматически удаляются максимум через 24 часа. Отсутствие постоянного хранения означает отсутствие утечек данных. Даже если кто-то захочет получить доступ к вашим старым письмам, их уже нет."
            },
            "noRegistration": {
                "title": "Регистрация не требуется",
                "text": "Мы никогда не спрашиваем ваше имя, email, номер телефона или другую личную информацию. Просто мгновенный доступ к временным email-адресам. Нет аккаунта — нет данных для компрометации."
            },
            "spamFilter": {
                "title": "Фильтрация спама и вредоносного ПО",
                "text": "Базовая защита от спама фильтрует вредоносные письма, пропуская легитимные сообщения. Подозрительные вложения и попытки фишинга автоматически блокируются."
            },
            "encryption": {
                "title": "Шифрование HTTPS",
                "text": "Все соединения с Fire Temp Mail используют шифрование HTTPS. Ваша связь с нашими серверами защищена и не может быть перехвачена третьими лицами."
            },
            "noTracking": {
                "title": "Без отслеживания третьими лицами",
                "text": "Мы не используем навязчивые файлы отслеживания и не делимся данными с рекламодателями. Ваша навигация остаётся конфиденциальной при использовании нашего сервиса."
            }
        },
        "limitations": {
            "title": "⚠️ Важно: Для чего Fire Temp Mail НЕ предназначен",
            "subtitle": "Будьте честны с собой: у временной почты есть ограничения. Вот что нужно знать.",
            "neverUseTitle": "Никогда не используйте временную почту для:",
            "banking": "Банковские или финансовые счета:",
            "bankingText": "Вам нужен постоянный доступ к этим аккаунтам. Сброс пароля и уведомления безопасности не дойдут, если email удалён.",
            "socialMedia": "Основные соцсети:",
            "socialMediaText": "Facebook, Instagram, Twitter, LinkedIn — используйте настоящую почту. Она понадобится для восстановления аккаунта.",
            "workSchool": "Рабочая или учебная почта:",
            "workSchoolText": "Важные сообщения должны быть постоянными и надёжными.",
            "government": "Государственные услуги:",
            "governmentText": "Налоговые декларации, пособия, официальные документы — для них нужны постоянные email-адреса.",
            "healthcare": "Медицинские порталы:",
            "healthcareText": "Медицинская информация и напоминания о приёмах слишком важны для временных email.",
            "ecommerce": "Аккаунты интернет-магазинов:",
            "ecommerceText": "Если планируете делать покупки или отслеживать заказы, используйте настоящую почту для подтверждений и поддержки.",
            "whyNot": "Почему нет?",
            "whyNotText": "Временные email удаляются автоматически через 24 часа. Если вам нужно восстановить аккаунт, сбросить пароль или получить важные уведомления позже, вы не получите эти письма. Используйте Fire Temp Mail только для некритичных, временных нужд.",
            "otherLimitations": "📧 Другие важные ограничения:",
            "cannotSend": "Нельзя отправлять письма:",
            "cannotSendText": "Fire Temp Mail работает только на приём. Вы можете читать входящие письма, но не можете отправлять ответы или писать новые сообщения.",
            "lifetime": "Срок жизни 24 часа:",
            "lifetimeText": "Письма хранятся максимум 24 часа. После этого они безвозвратно удаляются без возможности восстановления.",
            "attachments": "Нет гарантии безопасности вложений:",
            "attachmentsText": "Хотя мы фильтруем вредоносное ПО, мы не можем гарантировать 100% безопасность. Не открывайте подозрительные вложения.",
            "blocked": "Некоторые сайты блокируют временные email:",
            "blockedText": "Сервисы вроде PayPal, банков и некоторых соцсетей обнаруживают и блокируют домены временных email.",
            "noForwarding": "Нет пересылки почты:",
            "noForwardingText": "Вы можете просматривать письма в нашем интерфейсе, но не можете автоматически пересылать их на настоящую почту.",
            "perfectForTitle": "✅ Fire Temp Mail идеально подходит для:",
            "perfectFor1": "Бесплатных пробных регистраций (стриминговые сервисы, ПО)",
            "perfectFor2": "Скачивания ресурсов (электронные книги, шаблоны, руководства)",
            "perfectFor3": "Подписок на рассылки, в которых вы не уверены",
            "perfectFor4": "Регистраций на форумах и в сообществах",
            "perfectFor5": "Участия в конкурсах и розыгрышах",
            "perfectFor6": "Тестирования и разработки",
            "perfectFor7": "Одноразовых верификаций",
            "perfectFor8": "Защиты конфиденциальности на ненадёжных сайтах"
        }
    },
    "zh": {
        "howItWorks": {
            "title": "🚀 Fire Temp Mail 工作原理 - 分步指南",
            "subtitle": "通过我们简单的免注册流程，在几秒内获取您的临时邮箱",
            "step1Title": "即时生成邮箱",
            "step1Text": "您访问 Fire Temp Mail 的那一刻，我们会自动为您生成一个全新的临时邮箱地址。无需注册表单、无需个人信息、无需等待——即时访问。",
            "step2Title": "复制您的临时邮箱",
            "step2Text": "点击复制按钮将您的一次性邮箱地址保存到剪贴板。您可以在任何需要提供邮箱进行注册、下载或验证的地方使用此邮箱。",
            "step3Title": "即时接收邮件",
            "step3Text": "发送到您临时地址的所有邮件将在几秒内出现在收件箱中。根据需要查看、阅读和转发。收件箱实时自动更新。",
            "step4Title": "自动删除保护隐私",
            "step4Text": "您的临时邮件在24小时后自动删除，不留任何痕迹。您的隐私从设计上得到保护——无日志、无追踪、无永久存储。"
        },
        "useCases": {
            "title": "💡 何时使用 Fire Temp Mail：真实案例",
            "subtitle": "了解我们的用户如何在日常生活中保护他们的隐私",
            "gaming": {
                "title": "游戏平台注册",
                "scenario": "您想尝试一款新的在线游戏，但不想让游戏通讯塞满您的收件箱。",
                "solution": "使用 Fire Temp Mail 注册，验证您的游戏账户，保持真实邮箱远离垃圾邮件。非常适合无负担地尝试多个游戏平台。"
            },
            "downloads": {
                "title": "下载免费资源",
                "scenario": "网站提供免费电子书、模板或软件下载，但需要邮箱注册。",
                "solution": "使用临时邮箱获取下载链接，无需加入他们的邮件列表。获取资源后继续前进，无需担心未来的营销邮件。"
            },
            "shopping": {
                "title": "一次性购物折扣",
                "scenario": "一家网店为首次邮箱订阅者提供9折优惠，但您不想收到每日促销邮件。",
                "solution": "用一次性邮箱获取折扣码。享受优惠，远离垃圾邮件。"
            },
            "developer": {
                "title": "开发测试与质量保证",
                "scenario": "您正在测试应用中的邮件功能，需要多个邮箱地址用于不同的测试场景。",
                "solution": "生成无限临时邮箱，用于测试用户注册、邮箱验证、通知系统和密码恢复——无需管理真实账户。"
            },
            "social": {
                "title": "社交媒体试用账户",
                "scenario": "您想在使用真实邮箱之前先了解一个社交平台。",
                "solution": "用临时邮箱创建试用账户。如果喜欢该平台，您随时可以稍后用真实邮箱创建永久账户。"
            },
            "contests": {
                "title": "参加竞赛和抽奖",
                "scenario": "您想参加在线竞赛，但担心来自赞助商的垃圾邮件。",
                "solution": "使用 Fire Temp Mail 参加竞赛。如果获奖，您会收到通知；如果没有，不会有垃圾邮件跟随您。"
            }
        },
        "security": {
            "title": "🔒 我们如何保护您的隐私和安全",
            "subtitle": "您的匿名性是我们的首要任务。以下是我们如何保障您的安全。",
            "zeroLog": {
                "title": "零数据记录",
                "text": "我们不记录IP地址、不追踪用户行为、不存储个人信息。您的使用完全匿名。我们无法将临时邮箱追溯到个人用户。"
            },
            "autoDeletion": {
                "title": "自动删除",
                "text": "所有邮件在最多24小时后自动删除。没有永久存储意味着没有数据泄露。即使有人想访问您的旧邮件，它们已经不存在了。"
            },
            "noRegistration": {
                "title": "无需注册",
                "text": "我们从不要求您的姓名、邮箱、电话号码或任何个人信息。只需即时访问临时邮箱地址。没有账户意味着没有可泄露的数据。"
            },
            "spamFilter": {
                "title": "垃圾邮件和恶意软件过滤",
                "text": "基本的垃圾邮件保护过滤恶意邮件，同时允许合法消息通过。可疑附件和网络钓鱼尝试被自动拦截。"
            },
            "encryption": {
                "title": "HTTPS加密",
                "text": "所有与 Fire Temp Mail 的连接都使用HTTPS加密。您与我们服务器的通信是安全的，不会被第三方拦截。"
            },
            "noTracking": {
                "title": "无第三方追踪",
                "text": "我们不使用侵入性追踪Cookie，也不与广告商共享数据。使用我们的服务时，您的浏览保持私密。"
            }
        },
        "limitations": {
            "title": "⚠️ 重要：Fire Temp Mail 不适用于什么",
            "subtitle": "对自己诚实：临时邮箱有局限性。以下是您需要了解的。",
            "neverUseTitle": "永远不要将临时邮箱用于：",
            "banking": "银行或金融账户：",
            "bankingText": "您需要永久访问这些账户。如果邮箱被删除，密码重置和安全通知将无法送达。",
            "socialMedia": "主要社交媒体：",
            "socialMediaText": "Facebook、Instagram、Twitter、LinkedIn——使用您的真实邮箱。您需要它来恢复账户。",
            "workSchool": "工作或学校邮箱：",
            "workSchoolText": "重要的通信需要是永久和可靠的。",
            "government": "政府服务：",
            "governmentText": "报税、福利、官方文件——这些需要永久的邮箱地址。",
            "healthcare": "医疗门户：",
            "healthcareText": "医疗信息和预约提醒对临时邮箱来说太重要了。",
            "ecommerce": "电商账户：",
            "ecommerceText": "如果您计划购物或跟踪订单，请使用真实邮箱获取订单确认和客户支持。",
            "whyNot": "为什么不行？",
            "whyNotText": "临时邮箱在24小时后自动删除。如果您需要恢复账户、重置密码或稍后访问重要通知，您将收不到这些邮件。仅将 Fire Temp Mail 用于非关键的临时需求。",
            "otherLimitations": "📧 其他重要限制：",
            "cannotSend": "无法发送邮件：",
            "cannotSendText": "Fire Temp Mail 仅支持接收。您可以阅读收到的邮件，但无法发送回复或撰写新消息。",
            "lifetime": "24小时生命周期：",
            "lifetimeText": "邮件最多保留24小时。之后将被永久删除，无法恢复。",
            "attachments": "无附件安全保障：",
            "attachmentsText": "虽然我们过滤恶意软件，但无法保证100%安全。不要打开可疑附件。",
            "blocked": "部分网站屏蔽临时邮箱：",
            "blockedText": "PayPal、银行和一些社交平台等服务会检测并屏蔽临时邮箱域名。",
            "noForwarding": "无邮件转发：",
            "noForwardingText": "您可以在我们的界面中查看邮件，但无法自动转发到您的真实邮箱。",
            "perfectForTitle": "✅ Fire Temp Mail 完美适用于：",
            "perfectFor1": "免费试用注册（流媒体服务、软件）",
            "perfectFor2": "下载资源（电子书、模板、指南）",
            "perfectFor3": "您不确定的新闻通讯订阅",
            "perfectFor4": "论坛和社区注册",
            "perfectFor5": "参加竞赛和抽奖",
            "perfectFor6": "测试和开发工作",
            "perfectFor7": "一次性验证",
            "perfectFor8": "在不受信任的网站上保护隐私"
        }
    }
}

# ============================================================
# UPDATE ALL LOCALE FILES
# ============================================================

# 1. Update en.json
en_path = os.path.join(LOCALES_DIR, "en.json")
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

if 'home' not in en_data:
    en_data['home'] = {}

for key, value in new_home_keys.items():
    en_data['home'][key] = value

with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, indent=2, ensure_ascii=False)
print(f"EN: Added {len(new_home_keys)} new sections to home.*")

# 2. Update all non-English locales
for lang, trans in translations.items():
    locale_path = os.path.join(LOCALES_DIR, f"{lang}.json")
    with open(locale_path, 'r', encoding='utf-8') as f:
        locale_data = json.load(f)
    
    if 'home' not in locale_data:
        locale_data['home'] = {}
    
    for key, value in trans.items():
        locale_data['home'][key] = value
    
    with open(locale_path, 'w', encoding='utf-8') as f:
        json.dump(locale_data, f, indent=2, ensure_ascii=False)
    print(f"{lang.upper()}: Added {len(trans)} new sections to home.*")

print("\nAll locale files updated!")
