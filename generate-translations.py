#!/usr/bin/env python3
"""
Generate translations for all locale files based on en.json.
This generates proper translations for es, de, fr, pt, ar, ru, zh.
"""
import json
import os
import copy

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src/lib/i18n/locales')

with open(os.path.join(BASE, 'en.json'), 'r') as f:
    en = json.load(f)

# ============================================================================
# TRANSLATIONS Dictionary
# Key = en text, Value = {lang: translation}
# ============================================================================

# We'll build complete locale files by deep-copying the existing ones  
# and adding translations for all new keys

# Helper to get all leaf paths
def get_leaves(obj, prefix=''):
    leaves = {}
    for k, v in obj.items():
        key = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict):
            leaves.update(get_leaves(v, key))
        elif isinstance(v, list):
            leaves[key] = v  # Store lists as-is
        else:
            leaves[key] = v
    return leaves

def set_nested(obj, dotpath, value):
    """Set a value in a nested dict using dot-separated path"""
    parts = dotpath.split('.')
    for part in parts[:-1]:
        if part not in obj:
            obj[part] = {}
        obj = obj[part]
    obj[parts[-1]] = value

# Read existing locale files
locales = {}
for lang in ['es', 'de', 'fr', 'pt', 'ar', 'ru', 'zh']:
    path = os.path.join(BASE, f'{lang}.json')
    if os.path.exists(path):
        with open(path, 'r') as f:
            locales[lang] = json.load(f)
    else:
        locales[lang] = {}

# Get all EN leaf paths
en_leaves = get_leaves(en)

# ============================================================================
# SPANISH (es) TRANSLATIONS
# ============================================================================
es_translations = {
    # Common email UI
    "email.generateNew": "Generar Nuevo",
    "email.changeDomain": "Cambiar Dominio",
    "email.refreshPage": "Actualizar Página",
    "email.generateCustomEmail": "Generar Email Personalizado",
    "email.waitingForEmails": "Esperando correos entrantes",
    "email.refreshStopped": "Actualización automática detenida",
    "email.inboxEmpty": "Tu bandeja de entrada está vacía",
    "email.domain": "Dominio",
    "email.gmail": "Gmail",
    "email.googlemail": "GoogleMail",
    "email.copyToClipboard": "Copiar al portapapeles",
    "email.useCustomAlias2": "Usar alias personalizado",
    "email.changeDomain2": "Cambiar dominio",
    "email.refreshPage2": "Actualizar página",
    "email.scenario": "Escenario:",
    "email.solution": "Solución:",
    "email.challenge": "Desafío:",
    "email.testingWorkflow": "Flujo de pruebas:",
    "email.testScenarios": "Escenarios de prueba:",
    "email.perfectFor": "Perfecto para:",
    "email.important": "IMPORTANTE:",
    "email.neverUse": "NUNCA uses emails temporales para:",

    # Email Generator Page
    "emailGeneratorPage.h1": "Fire Temp Mail – Tu Generador de Email Temporal Desechable Gratis",
    "emailGeneratorPage.lead": "Genera instantáneamente una dirección de email desechable. Mantén tu email real privado y tu bandeja de entrada limpia de mensajes no deseados y spam.",
    "emailGeneratorPage.seoTitle": "Generador de Email para Desarrolladores y Pruebas QA",
    "emailGeneratorPage.seoDesc": "Generador de email temporal profesional diseñado específicamente para desarrolladores de software, ingenieros QA y testers de automatización. Genera direcciones de email desechables ilimitadas para probar flujos de registro, sistemas de verificación de email, restablecimiento de contraseñas y lógica de notificaciones — sin gestionar cuentas de prueba ni llenar bandejas de entrada personales.",
    "emailGeneratorPage.whyTitle": "Por Qué los Desarrolladores Necesitan Emails Desechables para Pruebas",
    "emailGeneratorPage.whyP1": "Probar funciones dependientes del email es esencial pero doloroso. Necesitas verificar el registro de usuarios, enlaces de confirmación por email, flujos de restablecimiento de contraseña y sistemas de notificaciones — pero crear docenas de cuentas de email reales es lento, insostenible y llena tu bandeja de entrada.",
    "emailGeneratorPage.whyP2": "Fire Temp Mail proporciona direcciones de email instantáneas y desechables diseñadas específicamente para pruebas de software. Genera emails temporales ilimitados para probar los flujos de email de tu aplicación sin gestionar cuentas de prueba ni lidiar con restricciones de proveedores de email.",
    "emailGeneratorPage.painPointsTitle": "Problemas Comunes de Desarrolladores (Resueltos)",
    "emailGeneratorPage.pp1": "Crear cuentas de prueba Gmail/Outlook manualmente → Genera emails ilimitados instantáneamente",
    "emailGeneratorPage.pp2": "Gestionar contraseñas para múltiples cuentas de prueba → Sin credenciales necesarias",
    "emailGeneratorPage.pp3": "Limpiar datos de prueba antiguos → Auto-eliminación después de 24 horas",
    "emailGeneratorPage.pp4": "Proveedores de email bloqueando registros automáticos → Dominios reales que funcionan en todas partes",
    "emailGeneratorPage.pp5": "Probar escenarios multi-usuario → Direcciones únicas ilimitadas bajo demanda",
    "emailGeneratorPage.pp6": "Pipelines CI/CD que necesitan emails frescos → Generación sin configuración",
    "emailGeneratorPage.uc1Title": "1. Pruebas de Registro de Usuario y Verificación de Email",
    "emailGeneratorPage.uc1P1": "Tu aplicación requiere verificación de email durante el registro. Necesitas probar que los emails de verificación llegan, los enlaces funcionan correctamente, los tokens expiran adecuadamente y se manejan los casos límite.",
    "emailGeneratorPage.uc1P2": "Genera un email temporal → Regístrate en tu app → Revisa la bandeja de entrada para el email de verificación (llega en segundos) → Extrae el enlace/token de verificación → Completa la verificación → Prueba casos límite (tokens expirados, verificaciones duplicadas).",
    "emailGeneratorPage.uc2Title": "2. Pruebas de Flujo de Restablecimiento de Contraseña",
    "emailGeneratorPage.uc2P1": "Prueba exhaustivamente tu funcionalidad de restablecimiento de contraseña generando cuentas de prueba con emails temporales, activando el flujo de contraseña olvidada, recibiendo emails de restablecimiento instantáneamente y verificando la seguridad de tokens y la lógica de expiración.",
    "emailGeneratorPage.uc2P2": "Solicitudes de restablecimiento válidas, tokens expirados, múltiples intentos de restablecimiento, direcciones de email inválidas, limitación de velocidad y seguridad entre cuentas.",
    "emailGeneratorPage.uc3Title": "3. Pruebas Multi-Usuario y Basadas en Roles",
    "emailGeneratorPage.uc3P1": "Probar aplicaciones con diferentes roles de usuario (admin, moderador, usuario) o sistemas multi-tenant requiere múltiples direcciones de email únicas. Genera emails temporales distintos para cada usuario de prueba sin la carga de gestionar cuentas reales.",
    "emailGeneratorPage.uc4Title": "4. Pruebas del Sistema de Notificaciones por Email",
    "emailGeneratorPage.uc4P1": "Si tu aplicación envía emails transaccionales (confirmaciones de pedidos, alertas, recordatorios, actualizaciones de estado), usa emails temporales para verificar que los emails se activan por los eventos correctos, la personalización se renderiza correctamente, el formato HTML/CSS se muestra correctamente y los enlaces funcionan como se espera.",
    "emailGeneratorPage.uc5Title": "5. Pruebas Automatizadas e Integración CI/CD",
    "emailGeneratorPage.uc5P1": "Tu pipeline CI/CD ejecuta pruebas E2E automatizadas que involucran flujos de trabajo basados en email. Cada ejecución de prueba necesita direcciones de email frescas y únicas.",
    "emailGeneratorPage.uc5P2": "Genera emails temporales programáticamente o usa patrones de nombres consistentes para crear direcciones únicas para cada ejecución de prueba sin intervención manual. Perfecto para suites de pruebas de Playwright, Cypress o Selenium.",
    "emailGeneratorPage.uc6Title": "6. Pruebas de Integración con Servicios de Email de Terceros",
    "emailGeneratorPage.uc6P1": "Probar integraciones con SendGrid, Mailgun, AWS SES, Postmark u otros proveedores de servicios de email requiere direcciones de destinatarios reales para verificar la entrega exitosa de email, eventos de webhook, lógica de manejo de rebotes, renderizado de plantillas y autenticación SPF/DKIM.",
    "emailGeneratorPage.featuresTitle": "Características para Desarrolladores",
    "emailGeneratorPage.f1": "Sin Configuración: Sin claves API, sin autenticación, sin creación de cuenta. Visita la página, obtén una dirección de email, comienza a probar.",
    "emailGeneratorPage.f2": "Recepción de Email en Tiempo Real: Los emails aparecen en la bandeja de entrada en segundos. Sin retrasos de polling, sin procesamiento en lotes.",
    "emailGeneratorPage.f3": "Acceso Completo al Email: Ve el contenido completo del email incluyendo cuerpo HTML, alternativa de texto plano, cabeceras de email, información del remitente y archivos adjuntos.",
    "emailGeneratorPage.f4": "Alias Personalizados para Organización: Usa direcciones de email descriptivas que mapean a casos de prueba específicos.",
    "emailGeneratorPage.f5": "Limpieza Automática: Los emails se auto-eliminan después de 24 horas. Sin limpieza manual, sin gestión de credenciales, sin carga de mantenimiento.",
    "emailGeneratorPage.securityTitle": "Recordatorio de Seguridad para Desarrolladores",
    "emailGeneratorPage.securityWarn": "Los emails temporales son públicos e inseguros. Úsalos SOLO para entornos de desarrollo, staging/QA con datos de prueba, bases de datos de prueba aisladas e integración de pruebas con APIs de mock/test.",
    "emailGeneratorPage.securityNever": "NUNCA uses emails temporales para: Sistemas de producción, datos de usuarios reales, pruebas de pago (incluso en sandbox), información sensible o credenciales de bases de datos de producción.",
    "emailGeneratorPage.startTitle": "Comienza a Probar Ahora",
    "emailGeneratorPage.startP1": "Deja de perder tiempo gestionando cuentas de email de prueba. Genera emails temporales ilimitados instantáneamente y concéntrate en lo que importa — construir y probar gran software. Sin registro, sin costo, sin complicaciones.",
    "emailGeneratorPage.startP2": "Desarrolladores frontend, ingenieros backend, testers QA, ingenieros DevOps, especialistas en automatización y cualquier persona que construya funciones dependientes del email.",

    # Temp Gmail Page
    "tempGmailPage.h1": "Temp Gmail - Crear Direcciones de Gmail Temporales",
    "tempGmailPage.lead": "Genera instantáneamente direcciones de Gmail desechables que parecen y funcionan como cuentas de Gmail reales. Protege tu bandeja de entrada personal del spam y mensajes no deseados.",
    "tempGmailPage.seoTitle1": "Funciones Ocultas de Privacidad de Gmail: Plus-Addressing y El Truco del Punto",
    "tempGmailPage.seoP1": "¿Sabías que tu cuenta de Gmail puede generar direcciones de email ilimitadas sin crear nuevas cuentas? Gmail tiene dos potentes funciones integradas que la mayoría de usuarios desconoce: plus-addressing (alias) y el truco del punto (colocación de puntos). Fire Temp Mail te ayuda a aprovechar estas funciones específicas de Gmail para proteger tu privacidad y organizar tu bandeja de entrada.",
    "tempGmailPage.seoP2": "Estos no son emails \"desechables\" de un servicio de terceros — son variaciones legítimas de tu dirección de Gmail real que se entregan directamente a tu bandeja de entrada existente mientras te permiten rastrear, filtrar y organizar mensajes por fuente.",
    "tempGmailPage.plusTitle": "Entendiendo Gmail Plus-Addressing (El Truco del \"+\")",
    "tempGmailPage.plusP1": "Gmail ignora todo después del signo más (+) en tu dirección de email. Si tu email es john.smith@gmail.com, todos estos se entregan a la misma bandeja de entrada:",
    "tempGmailPage.plusL1": "john.smith+shopping@gmail.com — Para sitios de compras en línea",
    "tempGmailPage.plusL2": "john.smith+newsletters@gmail.com — Para suscripciones a newsletters",
    "tempGmailPage.plusL3": "john.smith+facebook@gmail.com — Para registro en Facebook",
    "tempGmailPage.plusL4": "john.smith+netflix@gmail.com — Para prueba de Netflix",
    "tempGmailPage.plusL5": "john.smith+spam@gmail.com — Para sitios no confiables",
    "tempGmailPage.whyPlusTitle": "Por Qué el Plus-Addressing es Poderoso",
    "tempGmailPage.whyPlusP1": "1. Rastrear Vendedores de Email: Si te registras en un servicio con tunombre+servicioX@gmail.com y empiezas a recibir spam en esa dirección, sabes exactamente quién vendió tu email a los vendedores.",
    "tempGmailPage.whyPlusP2": "2. Filtrado Automático: Crea filtros de Gmail basados en la etiqueta \"+\" para organizar automáticamente los emails en carpetas, aplicar etiquetas o incluso auto-eliminar spam de fuentes específicas.",
    "tempGmailPage.whyPlusP3": "3. Organizar Registros: Usa diferentes etiquetas para diferentes categorías: +trabajo, +personal, +pruebas, +compras. Ve instantáneamente a qué categoría pertenece cada email.",
    "tempGmailPage.whyPlusP4": "4. Evitar Restricciones de \"Un Email Por Cuenta\": Algunos servicios (foros, concursos, pruebas) solo permiten una cuenta por email. Usa plus-addressing para crear \"múltiples\" direcciones.",
    "tempGmailPage.dotTitle": "El Truco del Punto de Gmail: La Colocación de Puntos No Importa",
    "tempGmailPage.dotP1": "Gmail ignora completamente los puntos en la parte del nombre de usuario de tu dirección de email. Eso significa que johnsmith@gmail.com, john.smith@gmail.com, j.o.h.n.s.m.i.t.h@gmail.com todos se entregan a la misma bandeja de entrada.",
    "tempGmailPage.dotUseTitle": "Cómo Usar el Truco del Punto",
    "tempGmailPage.dotUseP1": "Registros en Múltiples Cuentas: Si un sitio web solo permite un email por persona, puedes registrar múltiples cuentas usando diferentes colocaciones de puntos. El sitio los ve como emails diferentes, pero Gmail los ve todos como tuyos.",
    "tempGmailPage.combineTitle": "Combinando Plus-Addressing Y el Truco del Punto",
    "tempGmailPage.combineP1": "Para máxima flexibilidad, combina ambas funciones: j.o.h.n.smith+netflix@gmail.com. Esto crea prácticamente direcciones únicas ilimitadas que todas se dirigen a tu única bandeja de entrada de Gmail mientras proporcionan capacidades máximas de rastreo y filtrado.",
    "tempGmailPage.breachTitle": "Ejemplo del Mundo Real: Rastrear Filtraciones de Datos",
    "tempGmailPage.breachP1": "Digamos que te registras en \"ShoppingAppX\" usando tunombre+shoppingappx@gmail.com. Seis meses después, recibes spam en esa dirección exacta. Ahora sabes que ShoppingAppX:",
    "tempGmailPage.breachL1": "Vendió tu email a vendedores",
    "tempGmailPage.breachL2": "Tuvo una filtración de datos",
    "tempGmailPage.breachL3": "Comparte emails con \"socios\"",
    "tempGmailPage.breachP2": "Ahora puedes crear un filtro de Gmail para eliminar automáticamente todo lo enviado a tunombre+shoppingappx@gmail.com, bloqueando efectivamente esa fuente de spam sin afectar tus otros emails.",
    "tempGmailPage.filterTitle": "Cómo Configurar Filtros de Gmail para Plus-Addressing",
    "tempGmailPage.filterP1": "Una vez que empiezas a usar plus-addressing, organiza los emails entrantes automáticamente:",
    "tempGmailPage.filterL1": "Abrir Configuración de Gmail: Haz clic en el icono de engranaje → \"Ver todos los ajustes\"",
    "tempGmailPage.filterL2": "Ir a \"Filtros y direcciones bloqueadas\": Haz clic en \"Crear un nuevo filtro\"",
    "tempGmailPage.filterL3": "Agregar Regla de Filtro: En el campo \"Para\", ingresa tunombre+compras@gmail.com",
    "tempGmailPage.filterL4": "Elegir Acción: Aplicar etiqueta \"Compras\", saltar bandeja de entrada, marcar como leído, reenviar o eliminar",
    "tempGmailPage.filterL5": "Guardar Filtro: Haz clic en \"Crear filtro\" y listo",
    "tempGmailPage.filterP2": "Ahora cada email enviado a esa dirección se organiza automáticamente según tus reglas.",
    "tempGmailPage.limitTitle": "Limitaciones de las Funciones Integradas de Gmail",
    "tempGmailPage.limitP1": "Aunque son poderosas, el plus-addressing y el truco del punto de Gmail tienen algunas limitaciones:",
    "tempGmailPage.limitL1": "No es Verdaderamente Anónimo: Tu dirección de Gmail base sigue siendo visible. Cualquiera puede remover la \"+etiqueta\" para encontrar tu dirección real.",
    "tempGmailPage.limitL2": "Algunos Sitios Bloquean el Signo +: Algunos sitios web rechazan direcciones de email que contienen símbolos \"+\".",
    "tempGmailPage.limitL3": "Sin Protección de Google: Google todavía ve toda tu actividad. Estos trucos no te protegen de la recolección de datos de Google.",
    "tempGmailPage.limitL4": "No Puedes Eliminar Alias Individuales: A diferencia de los emails verdaderamente desechables, no puedes \"quemar\" un alias si se ve comprometido.",
    "tempGmailPage.limitL5": "No para Registros de Alto Riesgo: Dado que tu Gmail real todavía está técnicamente expuesto, no uses estos trucos para sitios web no confiables. Usa Fire Temp Mail en su lugar.",
    "tempGmailPage.vsTitle": "Cuándo Usar Trucos de Gmail vs. Emails Verdaderamente Desechables",
    "tempGmailPage.useGmailTitle": "Usa Plus-Addressing/Truco del Punto de Gmail Cuando:",
    "tempGmailPage.useGmailL1": "Quieras que los emails se entreguen a tu bandeja principal",
    "tempGmailPage.useGmailL2": "Necesites rastrear qué servicios comparten/venden tu email",
    "tempGmailPage.useGmailL3": "Quieras organizar emails de diferentes fuentes",
    "tempGmailPage.useGmailL4": "El servicio es relativamente confiable pero genera spam",
    "tempGmailPage.useGmailL5": "Podrías necesitar acceso a largo plazo a la cuenta",
    "tempGmailPage.useDispTitle": "Usa los Emails Totalmente Desechables de Fire Temp Mail Cuando:",
    "tempGmailPage.useDispL1": "Necesites anonimato completo (sin vínculo a tu email real)",
    "tempGmailPage.useDispL2": "Te registres en sitios web no confiables o riesgosos",
    "tempGmailPage.useDispL3": "Verificaciones de una sola vez que nunca necesitarás de nuevo",
    "tempGmailPage.useDispL4": "Pruebas durante el desarrollo sin llenar tu bandeja real",
    "tempGmailPage.useDispL5": "Servicios que podrían generar mucho spam o vender datos agresivamente",
    "tempGmailPage.tipsTitle": "Consejos de Privacidad y Técnicas Avanzadas Específicas de Gmail",
    "tempGmailPage.tip1Title": "1. Crear un Sistema de Filtros \"Quemador\" en Gmail",
    "tempGmailPage.tip1P1": "Configura un filtro dedicado para todos los emails con plus-addressing:",
    "tempGmailPage.tip1L1": "Condición del filtro: to:tunombre+*@gmail.com",
    "tempGmailPage.tip1L2": "Acción: Aplicar etiqueta \"Registros Rastreados\" y saltar bandeja de entrada",
    "tempGmailPage.tip1L3": "Resultado: Todos los emails con plus-addressing evitan tu bandeja principal, manteniéndola limpia",
    "tempGmailPage.tip2Title": "2. Usar Convenciones de Nombres Sistemáticas",
    "tempGmailPage.tip2P1": "Desarrolla un sistema de etiquetado consistente:",
    "tempGmailPage.tip2L1": "+compra-[nombresitio] — Sitios de compras",
    "tempGmailPage.tip2L2": "+noticias-[tema] — Newsletters",
    "tempGmailPage.tip2L3": "+prueba-[servicio] — Pruebas gratuitas",
    "tempGmailPage.tip2L4": "+social-[plataforma] — Redes sociales",
    "tempGmailPage.tip3Title": "3. Rastrear Fuentes de Filtraciones de Datos",
    "tempGmailPage.tip3P1": "Cuando recibas spam o emails de phishing, revisa el campo \"Para\". Si muestra tunombre+sitioconcreto@gmail.com, has identificado la fuente de la filtración o violación de datos.",
    "tempGmailPage.ctaTitle": "Comienza a Usar las Funciones de Privacidad de Gmail Hoy",
    "tempGmailPage.ctaP1": "El plus-addressing y el truco del punto de Gmail son funciones completamente gratuitas e integradas que funcionan ahora mismo con tu cuenta de Gmail existente. Sin registro, sin servicio de terceros, sin riesgo. Comienza a proteger tu privacidad y organizar tu bandeja de entrada aprovechando estas potentes capacidades específicas de Gmail.",
    "tempGmailPage.ctaP2": "Para situaciones que requieren anonimato completo: Usa las direcciones de email temporal verdaderamente desechables de Fire Temp Mail en la página principal. Para todo lo demás, usa las funciones de privacidad integradas de Gmail explicadas aquí.",

    # Burner Email Page
    "burnerEmailPage.h1": "Generador de Email Quemador Gratis – Crea Direcciones Desechables Instantáneamente",
    "burnerEmailPage.lead": "Genera direcciones de email anónimas al instante. Perfectas para proteger tu identidad real en línea — sin registro, sin datos personales requeridos.",
    "burnerEmailPage.seoTitle": "¿Qué Es un Email Quemador y Por Qué Lo Necesitas?",
    "burnerEmailPage.seoP1": "Un email quemador es una dirección de email desechable y temporal que te permite enviar o recibir mensajes sin revelar tu identidad real. A diferencia de una cuenta de email regular que puedes mantener durante años, un email quemador es deliberadamente de corta vida y anónimo — diseñado para usarse una vez y luego descartarse.",
    "burnerEmailPage.seoP2": "El término \"quemador\" viene de los \"teléfonos quemadores\" — teléfonos prepago e irrastreables usados para comunicación temporal. Los emails quemadores funcionan de la misma manera: crean una capa de separación entre tu identidad real y el mundo en línea.",
    "burnerEmailPage.howTitle": "Cómo Funcionan los Emails Quemadores",
    "burnerEmailPage.howP1": "Servicios de email quemador como Fire Temp Mail generan una dirección de email aleatoria en el momento en que visitas el sitio web. No necesitas crear una cuenta, ingresar información personal ni verificar nada. Así es como funcionan:",
    "burnerEmailPage.howL1": "Generación Instantánea: Visita el sitio web y recibe una dirección de email aleatoria y anónima inmediatamente.",
    "burnerEmailPage.howL2": "Recibir Emails: Usa la dirección para registrarte en servicios, recibir códigos de verificación o aceptar mensajes de una sola vez.",
    "burnerEmailPage.howL3": "Sin Vínculo de Identidad: La dirección no tiene conexión con tu nombre real, número de teléfono o email permanente.",
    "burnerEmailPage.howL4": "Auto-Expiración: Después de un corto período (normalmente 24 horas), la dirección de email y todos los mensajes asociados se eliminan permanentemente.",
    "burnerEmailPage.howL5": "Direcciones Ilimitadas: Genera tantas direcciones quemadoras como necesites. Cada una es completamente independiente.",
    "burnerEmailPage.usesTitle": "Principales Casos de Uso para Emails Quemadores",
    "burnerEmailPage.use1Title": "1. Registros y Suscripciones en Sitios Web",
    "burnerEmailPage.use1P": "La mayoría de sitios web requieren una dirección de email para crear una cuenta. Los emails quemadores te permiten registrarte sin arriesgar tu bandeja de entrada real a ser inundada con emails promocionales y newsletters.",
    "burnerEmailPage.use2Title": "2. Registros de Pruebas Gratuitas",
    "burnerEmailPage.use2P": "Muchos servicios ofrecen pruebas gratuitas por tiempo limitado pero requieren una dirección de email. Usa un email quemador para probar el servicio sin riesgo.",
    "burnerEmailPage.use3Title": "3. Compras en Línea y Cupones",
    "burnerEmailPage.use3P": "Los sitios de comercio frecuentemente requieren un email para checkout o para desbloquear descuentos. Un email quemador previene el spam post-compra mientras te da acceso a ofertas.",
    "burnerEmailPage.use4Title": "4. Login de Wi-Fi Público",
    "burnerEmailPage.use4P": "Cafeterías, aeropuertos y hoteles frecuentemente requieren una dirección de email para acceder a sus redes Wi-Fi. Usa un email quemador en lugar de tu email personal.",
    "burnerEmailPage.use5Title": "5. Descargar Recursos",
    "burnerEmailPage.use5P": "E-books, whitepapers, plantillas y otros recursos descargables usualmente están detrás de una puerta de email. Los emails quemadores te permiten acceder al contenido sin suscribirte a listas de correo no deseadas.",
    "burnerEmailPage.use6Title": "6. Registros en Foros y Comunidades",
    "burnerEmailPage.use6P": "Foros, comunidades tipo Reddit y tableros de discusión frecuentemente requieren emails para crear cuentas. Usa un email quemador para participar anónimamente.",
    "burnerEmailPage.use7Title": "7. Pruebas de Desarrollo y QA",
    "burnerEmailPage.use7P": "Los desarrolladores y testers de software constantemente necesitan direcciones de email frescas para probar flujos de registro, sistemas de verificación y funciones de notificación.",
    "burnerEmailPage.benefitsTitle": "Beneficios de Usar Emails Quemadores",
    "burnerEmailPage.ben1": "Protección de Privacidad: Tu email real permanece oculto. Nadie puede rastrear un email quemador hasta ti.",
    "burnerEmailPage.ben2": "Prevención de Spam: Todo el spam va a la dirección quemadora, manteniendo tu bandeja real limpia para siempre.",
    "burnerEmailPage.ben3": "Seguridad ante Filtraciones: Si el servicio al que te registraste es hackeado, tu email real no estará en su lista de usuarios filtrada.",
    "burnerEmailPage.ben4": "Sin Gestión de Cuentas: Sin contraseñas que recordar. Sin cuentas adicionales que mantener.",
    "burnerEmailPage.ben5": "Instantáneo y Gratis: Sin registro necesario. Sin costo. Solo visita, genera y usa.",
    "burnerEmailPage.vsTitle": "Email Quemador vs. Email Regular vs. Alias de Email",
    "burnerEmailPage.vsP1": "Email Regular (Gmail, Outlook): Permanente, vinculado a tu identidad, usado para comunicación a largo plazo. Vulnerable al spam y filtraciones de datos.",
    "burnerEmailPage.vsP2": "Alias de Email (+tags, puntos): Variaciones de tu email real que se entregan a tu bandeja de entrada. Útiles para organización pero no ocultan tu dirección real.",
    "burnerEmailPage.vsP3": "Email Quemador (Fire Temp Mail): Completamente separado de tu identidad real. Temporal, anónimo, auto-eliminable. Lo mejor para privacidad y uso de una sola vez.",

    # EDU Email Page
    "eduEmailPage.h1": "Generador de Email EDU Gratis – Crea un Buzón .EDU Desechable Instantáneamente",
    "eduEmailPage.lead": "Genera emails .EDU con nuestro generador de Email EDU gratuito. Perfecto para registros, pruebas, descuentos estudiantiles y más — sin exponer tu bandeja real al spam.",
    "eduEmailPage.seoTitle": "Principales Descuentos Estudiantiles y Beneficios de Email .EDU",
    "eduEmailPage.seoP1": "Los descuentos estudiantiles pueden ahorrarte miles de dólares por año en software, servicios de streaming y recursos de aprendizaje.",
    "eduEmailPage.discountsTitle": "Principales Descuentos Estudiantiles que Requieren Verificación .EDU",
    "eduEmailPage.spotifyTitle": "Spotify Premium Estudiante - $5.99/mes (50% de descuento)",
    "eduEmailPage.spotifyP1": "Precio Regular: $10.99/mes | Ahorro Estudiantil: $60/año",
    "eduEmailPage.spotifyP2": "Incluye Hulu (con anuncios) y SHOWTIME sin costo adicional. Verificado a través de SheerID con tu email .EDU.",
    "eduEmailPage.amazonTitle": "Amazon Prime Student - $7.49/mes",
    "eduEmailPage.amazonP1": "Precio Regular: $14.99/mes | Ahorro Estudiantil: $90/año + prueba GRATIS de 6 meses",
    "eduEmailPage.amazonP2": "Todos los beneficios Prime: Envío gratis en 2 días, Prime Video, Prime Music, almacenamiento ilimitado de fotos y más.",
    "eduEmailPage.adobeTitle": "Adobe Creative Cloud - 60% de descuento",
    "eduEmailPage.adobeP1": "Precio Regular: $59.99/mes | Precio Estudiante: $19.99/mes | Ahorro: $480/año",
    "eduEmailPage.adobeP2": "Suite completa: Photoshop, Illustrator, Premiere Pro, After Effects, InDesign y más de 20 aplicaciones.",
    "eduEmailPage.appleTitle": "Apple Music Estudiante - $5.99/mes",
    "eduEmailPage.appleP1": "Precio Regular: $10.99/mes | Ahorro Estudiantil: $60/año",
    "eduEmailPage.appleP2": "Catálogo completo de Apple Music más suscripción gratuita a Apple TV+ incluida.",
    "eduEmailPage.githubTitle": "GitHub Student Developer Pack - GRATIS",
    "eduEmailPage.githubP1": "Costo Normal: $200+/año en herramientas | Precio Estudiante: Completamente GRATIS",
    "eduEmailPage.githubP2": "GitHub Pro, nombre de dominio gratis, créditos en la nube, herramientas CI/CD y más de 20 herramientas y servicios para desarrolladores.",

    # Best Temp Mail Page
    "bestTempMailPage.h1": "Mejor Temp Mail – Servicio #1 de Email Temporal Desechable Gratis",
    "bestTempMailPage.lead": "El mejor servicio de correo temporal en línea. Genera direcciones de email desechables instantáneas — sin registro, sin información personal necesaria. Privado, rápido y gratis.",
    "bestTempMailPage.seoTitle": "Por Qué Fire Temp Mail es el Mejor Servicio de Email Temporal",
    "bestTempMailPage.seoP1": "Con docenas de servicios de email temporal disponibles en línea, elegir el correcto importa. Fire Temp Mail destaca como el mejor servicio de temp mail por varias razones clave.",
    "bestTempMailPage.comparison": "Comparación de Características con Otros Servicios",
    "bestTempMailPage.whyBestTitle": "Lo Que Nos Hace los Mejores",
    "bestTempMailPage.whyBestP1": "Fire Temp Mail combina velocidad, privacidad y simplicidad de una manera que ningún otro servicio de email temporal lo hace.",
    "bestTempMailPage.feature1": "Generación Instantánea: Sin esperas, sin registro. Visita la página y tu email temporal está listo inmediatamente.",
    "bestTempMailPage.feature2": "Múltiples Dominios: Elige entre varios dominios de email diferentes para adaptarte a tus necesidades.",
    "bestTempMailPage.feature3": "Direcciones Estilo Gmail: Obtén direcciones temporales tipo Gmail que funcionan en todas partes.",
    "bestTempMailPage.feature4": "Alias Personalizados: Crea direcciones temporales personalizadas para organización.",
    "bestTempMailPage.feature5": "Bandeja Auto-Actualizada: Los nuevos emails aparecen automáticamente sin actualización manual.",
    "bestTempMailPage.feature6": "Privacidad Primero: Sin rastreo, sin registro, sin recolección de datos.",

    # Gmail Generator Page
    "gmailGeneratorPage.h1": "Generador de Gmail Gratis – Crea Direcciones de Gmail Temporales Instantáneamente",
    "gmailGeneratorPage.lead": "Genera una dirección de Gmail temporal gratis con nuestro Generador de Gmail. Accede a una bandeja de Gmail desechable instantáneamente — sin registro, sin datos personales. Mantente anónimo en línea.",
    "gmailGeneratorPage.seoTitle": "Cómo Funciona el Generador de Gmail",
    "gmailGeneratorPage.seoP1": "Nuestro Generador de Gmail crea direcciones estilo Gmail desechables que funcionan como cuentas de Gmail reales. Úsalas para registros, verificaciones y pruebas sin exponer tu dirección de Gmail real.",
    "gmailGeneratorPage.howItWorksTitle": "Cómo Funciona",
    "gmailGeneratorPage.howItWorksP1": "1. Visita Fire Temp Mail y selecciona la opción Gmail. 2. Una dirección temporal estilo Gmail se genera instantáneamente. 3. Úsala para cualquier registro o verificación en línea. 4. Recibe emails en tiempo real en tu bandeja privada. 5. La dirección expira automáticamente después de 24 horas.",

    # Temporary Gmail Page
    "temporaryGmailPage.h1": "Gmail Temporal – Direcciones de Gmail Desechables Gratis",
    "temporaryGmailPage.lead": "Obtén una dirección de Gmail temporal gratis que funciona igual que una cuenta de Gmail real. Perfecta para registros, verificaciones y proteger tu bandeja principal del spam.",
    "temporaryGmailPage.seoTitle": "Direcciones de Gmail Temporales Explicadas",
    "temporaryGmailPage.seoP1": "Una dirección de Gmail temporal es un email desechable de corta vida que se ve y funciona como una cuenta de Gmail real. Te permite recibir emails de verificación, registrarte en servicios y mantener la privacidad sin exponer tu email permanente.",
    "temporaryGmailPage.benefitsTitle": "Beneficios del Gmail Temporal",
    "temporaryGmailPage.benefitsP1": "Protege tu Gmail real del spam, evita filtraciones de datos y regístrate en servicios anónimamente. Todo sin registro requerido.",

    # Temp Mail EDU Page
    "tempMailEduPage.h1": "Temp Mail EDU – Generador de Email .EDU Temporal Gratis",
    "tempMailEduPage.lead": "Genera direcciones de email .EDU temporales instantáneamente. Accede a descuentos estudiantiles, recursos educativos y herramientas en línea con una bandeja .EDU desechable.",
    "tempMailEduPage.seoTitle": "Usando Temp Mail para Propósitos Educativos",
    "tempMailEduPage.seoP1": "Los emails .EDU temporales pueden ayudarte a acceder a recursos educativos, probar sistemas de verificación estudiantil y explorar funciones de plataformas diseñadas para la comunidad académica.",

    # 10 Minute Mail Page
    "tenMinuteMailPage.h1": "10 Minute Mail – Email Desechable Rápido que Expira Rápido",
    "tenMinuteMailPage.lead": "¿Necesitas un email rápido de usar y tirar? Nuestro 10 Minute Mail te da una dirección desechable instantánea que se auto-elimina. Perfecto para registros y verificaciones de una sola vez.",
    "tenMinuteMailPage.seoTitle": "¿Qué es 10 Minute Mail y Cómo Funciona?",
    "tenMinuteMailPage.seoP1": "10 Minute Mail es un tipo de servicio de email desechable que te proporciona una dirección de email temporal que dura solo 10 minutos. Es la forma más rápida de obtener un email de usar y tirar para registros y verificaciones rápidas.",
    "tenMinuteMailPage.howTitle": "Cómo Funciona 10 Minute Mail",
    "tenMinuteMailPage.howP1": "Visita la página y obtén una dirección de email instantánea. Úsala para cualquier registro o verificación. La dirección y todos los emails se eliminan permanentemente después de 10 minutos.",
    "tenMinuteMailPage.whyTitle": "¿Por Qué Usar 10 Minute Mail?",
    "tenMinuteMailPage.whyP1": "A veces no necesitas una dirección de email por mucho tiempo. Registros rápidos, verificaciones de una sola vez y descargar contenido protegido son todos casos de uso perfectos para 10 minute mail.",
    "tenMinuteMailPage.vsTitle": "10 Minute Mail vs Temp Mail Regular",
    "tenMinuteMailPage.vsP1": "10 Minute Mail es más rápido y diseñado para casos de uso ultra-rápidos. El email temporal regular (como Fire Temp Mail) dura más (hasta 24 horas) y es mejor para pruebas, desarrollo y situaciones donde necesitas el email por más de unos minutos.",

    # Temporary Email Generator Page
    "temporaryEmailGenPage.h1": "Generador de Email Temporal – Crea Direcciones de Email Desechables Gratis",
    "temporaryEmailGenPage.lead": "Genera direcciones de email temporales instantáneamente. Nuestro Generador de Email Temporal proporciona bandejas desechables gratuitas — perfectas para proteger tu privacidad en línea.",
    "temporaryEmailGenPage.seoTitle": "Cómo Funcionan los Generadores de Email Temporal",
    "temporaryEmailGenPage.seoP1": "Un generador de email temporal crea direcciones de email anónimas de corta vida bajo demanda. Estas direcciones funcionan como emails regulares pero expiran automáticamente, manteniendo tu identidad real protegida.",

    # Fire Mail Page
    "fireMailPage.h1": "Fire Mail – Servicio de Email Temporal Rápido y Gratis",
    "fireMailPage.lead": "Fire Mail proporciona direcciones de email temporales instantáneas para privacidad completa en línea. Sin registro, sin datos personales — solo email desechable puro y encriptado.",
    "fireMailPage.seoTitle": "Por Qué Elegir Fire Mail para Email Temporal",
    "fireMailPage.seoP1": "Fire Mail está construido para velocidad, privacidad y confiabilidad. Nuestro servicio de email temporal genera direcciones desechables instantáneamente, con actualizaciones de bandeja en tiempo real y limpieza automática.",

    # Gmailnator Alternative Page
    "gmailnatorPage.h1": "Alternativa a Gmailnator – Generador de Gmail Temporal Gratis",
    "gmailnatorPage.lead": "¿Buscas una alternativa a Gmailnator? Fire Temp Mail ofrece la misma funcionalidad con mejor privacidad, rendimiento más rápido y entrega de email más confiable.",
    "gmailnatorPage.seoTitle": "Mejor Alternativa a Gmailnator en 2024",
    "gmailnatorPage.seoP1": "Gmailnator fue un servicio popular para generar direcciones de Gmail temporales. Fire Temp Mail ofrece la misma funcionalidad con confiabilidad mejorada, mejores protecciones de privacidad y una experiencia de usuario moderna.",

    # About Page
    "about.metaTitle": "Acerca de Fire Temp Mail - Nuestra Misión e Historia",
    "about.metaDescription": "Conoce Fire Temp Mail — un servicio de email temporal gratuito que protege tu privacidad en línea. Nuestra misión y valores.",
    "about.title": "Acerca de Fire Temp Mail",
    "about.subtitle": "Protegiendo tu privacidad digital, un email temporal a la vez",
    "about.missionTitle": "Nuestra Misión",
    "about.missionP1": "Fire Temp Mail fue creado para resolver un problema simple pero crítico: la erosión de la privacidad en línea. Cada día, millones de personas se ven obligadas a proporcionar sus direcciones de email personales para acceder a servicios, registrarse en pruebas o descargar recursos — resultando frecuentemente en una bandeja de entrada inundada de spam y emails de marketing no deseados.",
    "about.missionP2": "Creemos que tu dirección de email es personal. No deberías tener que sacrificar tu privacidad o comprometer la seguridad de tu bandeja de entrada solo para acceder a servicios en línea. Por eso construimos Fire Temp Mail: un servicio de email temporal completamente gratuito y sin registro que pone tu privacidad primero.",
    "about.whatWeDoTitle": "Lo Que Hacemos",
    "about.whatWeDoP1": "Fire Temp Mail proporciona direcciones de email instantáneas, anónimas y desechables que cualquiera puede usar — sin registro requerido. Ya sea que necesites un email temporal para un registro de una sola vez, para evitar spam de newsletters o para proteger tu identidad real en línea, te tenemos cubierto.",
    "about.whatWeDo1": "Generación instantánea de email — solo visita y obtén una dirección de email funcional",
    "about.whatWeDo2": "Bandeja en tiempo real — recibe emails instantáneamente en tu navegador",
    "about.whatWeDo3": "Múltiples dominios — elige entre varios dominios de email disponibles",
    "about.whatWeDo4": "Alias personalizados — crea direcciones temporales personalizadas",
    "about.whatWeDo5": "Direcciones estilo Gmail — obtén direcciones temporales tipo Gmail",
    "about.whatWeDo6": "Auto-eliminación — los emails se limpian automáticamente para total privacidad",
    "about.whyTitle": "¿Por Qué Fire Temp Mail?",
    "about.whyP1": "En un mundo donde las filtraciones de datos, el spam y el marketing no solicitado son problemas cotidianos, Fire Temp Mail ofrece una solución simple pero poderosa.",
    "about.why1": "Gratis para siempre — sin costos ocultos, suscripciones o restricciones premium",
    "about.why2": "Sin registro — comienza a usar instantáneamente, sin cuenta necesaria",
    "about.why3": "Privacidad primero — no rastreamos, vendemos ni monetizamos tus datos",
    "about.why4": "Abierto y transparente — servicio directo sin trucos",
    "about.why5": "Rápido y confiable — construido sobre infraestructura moderna para velocidad",
    "about.valuesTitle": "Nuestros Valores",
    "about.value1Title": "Privacidad Ante Todo",
    "about.value1Text": "Creemos que la privacidad es un derecho fundamental. Nuestro servicio está diseñado desde cero para proteger la tuya.",
    "about.value2Title": "Simplicidad",
    "about.value2Text": "Obtener un email temporal debe ser sin esfuerzo. Visita nuestro sitio, obtén un email, úsalo. Eso es todo.",
    "about.value3Title": "Transparencia",
    "about.value3Text": "Sin agendas ocultas. Somos directos sobre cómo funciona nuestro servicio y cómo lo sostenemos.",
    "about.value4Title": "Accesibilidad",
    "about.value4Text": "Todos merecen privacidad. Por eso Fire Temp Mail es gratis para todos, en todas partes.",
    "about.futureTitle": "Mirando Hacia Adelante",
    "about.futureP1": "Estamos mejorando constantemente Fire Temp Mail para servir mejor a nuestros usuarios. Nuestra hoja de ruta incluye funciones de seguridad mejoradas, más opciones de dominio, experiencia móvil mejorada y herramientas adicionales para proteger tu privacidad digital.",
    "about.futureP2": "Gracias por confiar en Fire Temp Mail con tu privacidad en línea. Juntos, estamos construyendo un internet más seguro y privado — un email temporal a la vez.",
    "about.contactTitle": "Ponte en Contacto",
    "about.contactP1": "¿Tienes preguntas, comentarios o simplemente quieres saludar? Nos encantaría escucharte.",
    "about.contactEmail": "Envíanos un email a",
    "about.contactLink": "O visita nuestra página de Contacto"
}

# For each target locale, merge existing translations with new ones
for lang_code, translations in [('es', es_translations)]:
    locale = locales[lang_code]
    for dotpath, value in translations.items():
        set_nested(locale, dotpath, value)
    
    # Write the updated locale
    with open(os.path.join(BASE, f'{lang_code}.json'), 'w') as f:
        json.dump(locale, f, indent=2, ensure_ascii=False)
    print(f"Updated {lang_code}.json with {len(translations)} new keys")

print("\nDone! ES translations written.")
print("Note: DE, FR, PT, AR, RU, ZH translations need to be generated separately.")
