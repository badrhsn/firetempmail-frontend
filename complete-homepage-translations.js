import fs from 'fs';
import path from 'path';

const localesDir = './src/lib/i18n/locales';

// Read the complete Spanish home section as reference
const esData = JSON.parse(fs.readFileSync(path.join(localesDir, 'es.json'), 'utf8'));
const esHome = esData.home;

// Complete home translations for each language
const homeTranslations = {
  de: {
    title: "Fire Temp Mail – Ihr kostenloser temporärer Wegwerf-E-Mail-Generator",
    subtitle: "Generieren Sie sofort eine Wegwerf-E-Mail-Adresse. Halten Sie Ihre echte E-Mail-Adresse privat und Ihren Posteingang frei von unerwünschten Nachrichten und Spam.",
    gmailSection: {
      title: "Gmail Temp Mail Generator: Erhalten Sie sofort eine kostenlose temporäre Gmail-Adresse",
      intro: "Erstellen Sie in Sekunden eine voll funktionsfähige temporäre Gmail-Adresse mit unserem fortschrittlichen Gmail Temp Mail Generator. Erhalten Sie eine kostenlose, Wegwerf-Gmail-Adresse, die genau wie ein echtes Gmail-Konto funktioniert – perfekt für die Anmeldung auf jeder Website, ohne Ihre persönliche E-Mail preiszugeben.",
      whyTitle: "Warum eine temporäre Gmail-Adresse verwenden?",
      whyText: "Schützen Sie Ihren Hauptposteingang vor Spam, Marketing-E-Mails und potenziellen Datenschutzverletzungen. Unser Temp Gmail Generator bietet eine private, sichere Alternative für alle Ihre Online-Anmeldungen, Verifizierungen und Testversionen. Halten Sie Ihr persönliches Gmail sauber und organisiert, während Sie vollständige Privatsphäre wahren.",
      features: {
        instant: "Sofortige Gmail-Adressgenerierung - keine Registrierung erforderlich",
        real: "Echte Gmail-Adressen, die auf allen Plattformen und Websites funktionieren",
        free: "Völlig kostenloser temporärer Gmail-Service ohne versteckte Kosten",
        bypass: "Perfekt zum Umgehen von E-Mail-Verifizierungssperren und -beschränkungen"
      },
      howTitle: "So erhalten Sie Ihr temporäres Gmail",
      howText: "Das Erhalten Ihrer Wegwerf-Gmail-Adresse ist einfach. Wählen Sie einfach die Gmail-Option und generieren Sie Ihre temporäre E-Mail. Verwenden Sie sie sofort für jede Website-Registrierung, App-Verifizierung oder Service-Anmeldung. Ihre Nachrichten erscheinen sofort in Ihrem privaten Posteingang.",
      idealTitle: "Ideal für alle Ihre Online-Bedürfnisse",
      idealText: "Unser Gmail Temp Mail Service ist perfekt für kostenlose Testversionen, Social-Media-Anmeldungen, Website-Registrierungen, App-Verifizierungen, Newsletter-Abonnements und temporäre Kommunikation. Wenn Sie fertig sind, verwerfen Sie einfach die Adresse – keine Spuren hinterlassen.",
      cta: "Bereit, Ihre Privatsphäre zu schützen? Generieren Sie jetzt Ihre kostenlose temporäre Gmail-Adresse und erleben Sie sichere, spam-freie Anmeldungen auf allen Plattformen."
    },
    whatIsTitle: "Was ist eine Wegwerf-Temp-E-Mail?",
    whatIsText: "Eine Wegwerf-E-Mail-Adresse ist ein kostenloser temporärer E-Mail-Service, der einen kurzfristigen Posteingang zum Empfangen von E-Mails erstellt. Oft als Tempmail, 10minmail, Wegwerf-E-Mail oder Burner-Mail bezeichnet, hilft es Ihnen, Spam zu vermeiden und Ihre Haupt-E-Mail zu schützen. Anstatt Ihre echten E-Mail-Konten preiszugeben, können Sie sich auf Fire Temp Mail verlassen, um Ihren persönlichen Posteingang sicher, privat und spam-frei zu halten.",
    guidesTitle: "Plattformspezifische Anleitungen",
    guidesSubtitle: "Lernen Sie, wie Sie temporäre E-Mails für beliebte Plattformen verwenden und Ihre Privatsphäre schützen",
    discordGuide: {
      title: "Discord Temp Mail",
      description: "Erstellen Sie Discord-Konten, ohne Ihre persönliche E-Mail preiszugeben. Vollständiger Verifizierungsleitfaden."
    },
    instagramGuide: {
      title: "Instagram Temp E-Mail",
      description: "Melden Sie sich für Instagram mit Wegwerf-E-Mail an. Vermeiden Sie Spam und verwalten Sie mehrere Konten."
    },
    tiktokGuide: {
      title: "TikTok temporäre E-Mail",
      description: "Erstellen Sie TikTok-Konten mit Temp Mail. Halten Sie Ihren Posteingang frei von Werbe-E-Mails."
    },
    techTitle: "Die Technologie hinter Wegwerf-E-Mail-Adressen",
    techIntro: "In der heutigen digitalen Welt sind E-Mail-Adressen zu unseren Online-Pässen geworden – unverzichtbar für Arbeitskommunikation, Geschäftsverbindungen, soziale Interaktionen und den Zugang zu Diensten. Fast alle Anwendungen und Online-Dienste erfordern eine E-Mail-Adresse zur Registrierung, ebenso wie Treueprogramme, Wettbewerbe und Sonderangebote.",
    deasTitle: "Was sind Wegwerf-E-Mail-Adressen?",
    deasText: "Wegwerf-E-Mail-Adressen (DEAs) bieten eine innovative Lösung zur Wahrung der Online-Privatsphäre beim Zugriff auf digitale Dienste. Diese temporären Adressen ermöglichen es Ihnen:",
    deasFeatures: {
      register: "Sich für Dienste zu registrieren, ohne Ihre Haupt-E-Mail preiszugeben",
      protect: "Ihre Identität vor Datenschutzverletzungen und Spam-Listen zu schützen",
      control: "Die Kontrolle über Ihren digitalen Fußabdruck zu behalten",
      expire: "Automatisch nach einem festgelegten Zeitraum zu verfallen"
    },
    deasCompromise: "Wenn eine Wegwerfadresse kompromittiert wird oder unerwünschte E-Mails empfängt, können Sie sie einfach entfernen, ohne Ihre Hauptkommunikationskanäle zu beeinträchtigen.",
    usesTitle: "Praktische Verwendungsmöglichkeiten für temporäre E-Mail-Adressen",
    uses: {
      trials: {
        title: "Erweiterte kostenlose Testversionen",
        text: "Viele Streaming-Dienste wie Netflix, Hulu und Amazon Prime bieten zeitlich begrenzte Testversionen an. Mit Wegwerf-E-Mails können Sie Ihre Testzeiträume verlängern und gleichzeitig Zugang zu diesen Diensten behalten."
      },
      retail: {
        title: "Einzelhandelsangebote ohne Spam",
        text: "Geschäfte fordern häufig E-Mail-Adressen für Sonderangebote an, was oft zu Werbe-Spam führt. Temporäre E-Mails ermöglichen es Ihnen, auf diese Vorteile zuzugreifen, ohne Ihren Hauptposteingang zu überladen."
      },
      testing: {
        title: "Anwendungstests",
        text: "Entwickler können mehrere Testkonten mit Wegwerf-E-Mails erstellen, um ihre Anwendungen gründlich zu bewerten, bevor sie veröffentlicht werden."
      },
      multiple: {
        title: "Verwaltung mehrerer Konten",
        text: "Wenn Dienste separate Konten für verschiedene Zwecke erfordern (wie die Verwaltung mehrerer Social-Media-Profile), bieten Wegwerf-E-Mails die notwendige Trennung, ohne permanente neue Konten zu erstellen."
      },
      spam: {
        title: "Spam-Prävention",
        text: "Die Verwendung temporärer E-Mails für Foren, Diskussionsgruppen und Webformulare reduziert Spam in Ihrem Hauptposteingang erheblich."
      }
    },
    choosingTitle: "Den richtigen Wegwerf-E-Mail-Service wählen",
    choosingText: "Die besten Anbieter temporärer E-Mails bieten:",
    choosingFeatures: {
      instant: "Sofortige E-Mail-Generierung mit einem Klick",
      privacy: "Keine Registrierung oder Erfassung persönlicher Daten",
      anonymous: "Vollständige Anonymität für Benutzer",
      unlimited: "Unbegrenzte E-Mail-Adresserstellung",
      inbox: "Temporäre Posteingangs-Funktionalität",
      interface: "Benutzerfreundliche Oberfläche",
      custom: "Anpassbare Adressoptionen"
    },
    effectiveTitle: "Wie man Wegwerf-E-Mail-Adressen effektiv nutzt",
    effectiveText: "Während einige Benutzer sekundäre Konten bei traditionellen Anbietern wie Gmail erstellen, erfordert dieser Ansatz die Verwaltung mehrerer Posteingänge. Professionelle Wegwerf-E-Mail-Dienste wie Fire Temp Mail bieten eine effizientere Lösung, indem sie temporäre Adressen bereitstellen, die an Ihre Haupt-E-Mail weiterleiten und gleichzeitig vollständige Trennung aufrechterhalten.",
    effectiveAdvanced: "Die erweiterte Funktionalität ermöglicht es Ihnen, Nachrichten zu filtern – verdächtige E-Mails direkt in den Papierkorb zu senden, während wichtige Mitteilungen an Ihren Hauptposteingang zugestellt werden. Wenn eine Adresse kompromittiert wird, können Sie sie einfach deaktivieren, ohne Ihre anderen Konten zu beeinträchtigen.",
    conclusionTitle: "Fazit: Verbessern Sie Ihre Online-Privatsphäre",
    conclusionText: "Die Implementierung eines Wegwerf-E-Mail-Systems ist eine effektive Strategie zur Teilnahme an Online-Foren, Chatrooms, Filesharing-Diensten und Schwarzen Brettern, während Sie Ihre primäre Identität schützen. Durch die Verwendung temporärer Adressen von Fire Temp Mail stellen Sie sicher, dass Ihre persönlichen Informationen sicher bleiben und Ihr Posteingang frei von unerwünschtem Spam bleibt. Übernehmen Sie noch heute die Kontrolle über Ihre digitale Privatsphäre mit unserem sicheren, anonymen temporären E-Mail-Service, der entwickelt wurde, um Ihre Online-Aktivitäten von Ihren persönlichen Kommunikationskanälen getrennt zu halten."
  },
  fr: {
    title: "Fire Temp Mail – Votre générateur gratuit d'e-mail temporaire jetable",
    subtitle: "Générez instantanément une adresse e-mail jetable. Gardez votre vraie adresse e-mail privée et votre boîte de réception propre des messages indésirables et du spam.",
    gmailSection: {
      title: "Générateur Gmail Temp Mail : Obtenez instantanément une adresse Gmail temporaire gratuite",
      intro: "Créez une adresse Gmail temporaire entièrement fonctionnelle en quelques secondes avec notre générateur Gmail temp mail avancé. Obtenez une adresse Gmail jetable gratuite qui fonctionne exactement comme un vrai compte Gmail - parfait pour s'inscrire sur n'importe quel site Web sans révéler votre e-mail personnel.",
      whyTitle: "Pourquoi utiliser une adresse Gmail temporaire ?",
      whyText: "Protégez votre boîte de réception principale du spam, des e-mails marketing et des violations de données potentielles. Notre générateur temp Gmail fournit une alternative privée et sécurisée pour toutes vos inscriptions en ligne, vérifications et essais. Gardez votre Gmail personnel propre et organisé tout en maintenant une confidentialité totale.",
      features: {
        instant: "Génération instantanée d'adresse Gmail - aucune inscription requise",
        real: "Vraies adresses Gmail qui fonctionnent sur toutes les plateformes et sites Web",
        free: "Service Gmail temporaire entièrement gratuit sans frais cachés",
        bypass: "Parfait pour contourner les blocages et restrictions de vérification par e-mail"
      },
      howTitle: "Comment obtenir votre Gmail temporaire",
      howText: "Obtenir votre adresse Gmail jetable est simple. Sélectionnez simplement l'option Gmail et générez votre e-mail temporaire. Utilisez-le immédiatement pour toute inscription sur un site Web, vérification d'application ou inscription à un service. Vos messages apparaîtront instantanément dans votre boîte de réception privée.",
      idealTitle: "Idéal pour tous vos besoins en ligne",
      idealText: "Notre service Gmail temp mail est parfait pour les essais gratuits, les inscriptions aux réseaux sociaux, les inscriptions sur les sites Web, les vérifications d'applications, les abonnements aux newsletters et les communications temporaires. Lorsque vous avez terminé, jetez simplement l'adresse - aucune trace laissée.",
      cta: "Prêt à protéger votre vie privée ? Générez votre adresse Gmail temporaire gratuite maintenant et profitez d'inscriptions sécurisées et sans spam sur toutes les plateformes."
    },
    whatIsTitle: "Qu'est-ce qu'un e-mail temporaire jetable ?",
    whatIsText: "Une adresse e-mail jetable est un service d'e-mail temporaire gratuit qui crée une boîte de réception à court terme pour recevoir des e-mails. Souvent appelée tempmail, 10minmail, e-mail jetable ou burner mail, elle vous aide à éviter le spam et à protéger votre e-mail principal. Au lieu d'exposer vos vrais comptes e-mail, vous pouvez compter sur Fire Temp Mail pour garder votre boîte de réception personnelle sûre, privée et sans spam.",
    guidesTitle: "Guides spécifiques aux plateformes",
    guidesSubtitle: "Apprenez à utiliser l'e-mail temporaire pour les plateformes populaires et protégez votre vie privée",
    discordGuide: {
      title: "Discord Temp Mail",
      description: "Créez des comptes Discord sans exposer votre e-mail personnel. Guide de vérification complet."
    },
    instagramGuide: {
      title: "Instagram E-mail temporaire",
      description: "Inscrivez-vous sur Instagram en utilisant un e-mail jetable. Évitez le spam et gérez plusieurs comptes."
    },
    tiktokGuide: {
      title: "TikTok E-mail temporaire",
      description: "Créez des comptes TikTok avec temp mail. Gardez votre boîte de réception propre des e-mails promotionnels."
    },
    techTitle: "La technologie derrière les adresses e-mail jetables",
    techIntro: "Dans le monde numérique d'aujourd'hui, les adresses e-mail sont devenues nos passeports en ligne - essentielles pour la communication professionnelle, les connexions d'affaires, les interactions sociales et l'accès aux services. Presque toutes les applications et services en ligne nécessitent une adresse e-mail pour l'inscription, tout comme les programmes de fidélité, les concours et les offres spéciales.",
    deasTitle: "Que sont les adresses e-mail jetables ?",
    deasText: "Les adresses e-mail jetables (DEA) fournissent une solution innovante pour maintenir la confidentialité en ligne tout en accédant aux services numériques. Ces adresses temporaires vous permettent de :",
    deasFeatures: {
      register: "Vous inscrire à des services sans révéler votre e-mail principal",
      protect: "Protéger votre identité des violations de données et des listes de spam",
      control: "Maintenir le contrôle sur votre empreinte numérique",
      expire: "Expirer automatiquement après une période définie"
    },
    deasCompromise: "Lorsqu'une adresse jetable est compromise ou commence à recevoir des e-mails indésirables, vous pouvez simplement la retirer sans affecter vos canaux de communication principaux.",
    usesTitle: "Utilisations pratiques des adresses e-mail temporaires",
    uses: {
      trials: {
        title: "Essais gratuits prolongés",
        text: "De nombreux services de streaming comme Netflix, Hulu et Amazon Prime offrent des essais à durée limitée. Avec des e-mails jetables, vous pouvez prolonger vos périodes d'essai tout en maintenant l'accès à ces services."
      },
      retail: {
        title: "Offres de vente au détail sans spam",
        text: "Les magasins demandent fréquemment des adresses e-mail pour des offres spéciales, ce qui conduit souvent à du spam promotionnel. Les e-mails temporaires vous permettent d'accéder à ces avantages sans encombrer votre boîte de réception principale."
      },
      testing: {
        title: "Test d'applications",
        text: "Les développeurs peuvent créer plusieurs comptes de test en utilisant des e-mails jetables pour évaluer minutieusement leurs applications avant leur publication."
      },
      multiple: {
        title: "Gestion de plusieurs comptes",
        text: "Lorsque les services nécessitent des comptes séparés pour différents objectifs (comme la gestion de plusieurs profils de réseaux sociaux), les e-mails jetables fournissent la séparation nécessaire sans créer de nouveaux comptes permanents."
      },
      spam: {
        title: "Prévention du spam",
        text: "L'utilisation d'e-mails temporaires pour les forums, les groupes de discussion et les formulaires Web réduit considérablement le spam dans votre boîte de réception principale."
      }
    },
    choosingTitle: "Choisir le bon service d'e-mail jetable",
    choosingText: "Les meilleurs fournisseurs d'e-mails temporaires offrent :",
    choosingFeatures: {
      instant: "Génération instantanée d'e-mail en un clic",
      privacy: "Aucune inscription ni collecte d'informations personnelles",
      anonymous: "Anonymat complet pour les utilisateurs",
      unlimited: "Création illimitée d'adresses e-mail",
      inbox: "Fonctionnalité de boîte de réception temporaire",
      interface: "Interface conviviale",
      custom: "Options d'adresse personnalisables"
    },
    effectiveTitle: "Comment utiliser efficacement les adresses e-mail jetables",
    effectiveText: "Alors que certains utilisateurs créent des comptes secondaires avec des fournisseurs traditionnels comme Gmail, cette approche nécessite la gestion de plusieurs boîtes de réception. Les services professionnels d'e-mail jetable comme Fire Temp Mail offrent une solution plus efficace en fournissant des adresses temporaires qui transfèrent vers votre e-mail principal tout en maintenant une séparation complète.",
    effectiveAdvanced: "La fonctionnalité avancée vous permet de filtrer les messages - envoyer les e-mails suspects directement à la corbeille tout en livrant les communications importantes à votre boîte de réception principale. Si une adresse est compromise, vous pouvez simplement la désactiver sans affecter vos autres comptes.",
    conclusionTitle: "Conclusion : Améliorez votre confidentialité en ligne",
    conclusionText: "La mise en place d'un système d'e-mail jetable est une stratégie efficace pour participer aux forums en ligne, aux salons de discussion, aux services de partage de fichiers et aux babillards tout en protégeant votre identité principale. En utilisant des adresses temporaires de Fire Temp Mail, vous vous assurez que vos informations personnelles restent sécurisées et que votre boîte de réception reste exempte de spam indésirable. Prenez le contrôle de votre vie privée numérique dès aujourd'hui avec notre service d'e-mail temporaire sécurisé et anonyme conçu pour garder vos activités en ligne séparées de vos canaux de communication personnels."
  },
  pt: {
    title: "Fire Temp Mail – Seu gerador gratuito de e-mail temporário descartável",
    subtitle: "Gere instantaneamente um endereço de e-mail descartável. Mantenha seu endereço de e-mail real privado e sua caixa de entrada limpa de mensagens indesejadas e spam.",
    gmailSection: {
      title: "Gerador de Gmail Temporário: Obtenha um endereço Gmail temporário gratuito instantaneamente",
      intro: "Crie um endereço Gmail temporário totalmente funcional em segundos com nosso gerador avançado de Gmail temp mail. Obtenha um endereço Gmail descartável gratuito que funciona exatamente como uma conta Gmail real - perfeito para se inscrever em qualquer site sem revelar seu e-mail pessoal.",
      whyTitle: "Por que usar um endereço Gmail temporário?",
      whyText: "Proteja sua caixa de entrada principal de spam, e-mails de marketing e possíveis violações de dados. Nosso gerador temp Gmail fornece uma alternativa privada e segura para todos os seus registros online, verificações e testes. Mantenha seu Gmail pessoal limpo e organizado enquanto mantém total privacidade.",
      features: {
        instant: "Geração instantânea de endereço Gmail - sem registro necessário",
        real: "Endereços Gmail reais que funcionam em todas as plataformas e sites",
        free: "Serviço Gmail temporário completamente gratuito sem custos ocultos",
        bypass: "Perfeito para contornar bloqueios e restrições de verificação de e-mail"
      },
      howTitle: "Como obter seu Gmail temporário",
      howText: "Obter seu endereço Gmail descartável é simples. Basta selecionar a opção Gmail e gerar seu e-mail temporário. Use-o imediatamente para qualquer registro de site, verificação de aplicativo ou inscrição em serviço. Suas mensagens aparecerão instantaneamente em sua caixa de entrada privada.",
      idealTitle: "Ideal para todas as suas necessidades online",
      idealText: "Nosso serviço Gmail temp mail é perfeito para testes gratuitos, inscrições em redes sociais, registros de sites, verificações de aplicativos, assinaturas de newsletters e comunicações temporárias. Quando terminar, simplesmente descarte o endereço - sem deixar rastros.",
      cta: "Pronto para proteger sua privacidade? Gere seu endereço Gmail temporário gratuito agora e experimente inscrições seguras e sem spam em todas as plataformas."
    },
    whatIsTitle: "O que é um e-mail temporário descartável?",
    whatIsText: "Um endereço de e-mail descartável é um serviço de e-mail temporário gratuito que cria uma caixa de entrada de curto prazo para receber e-mails. Frequentemente chamado de tempmail, 10minmail, e-mail descartável ou burner mail, ajuda você a evitar spam e proteger seu e-mail principal. Em vez de expor suas contas de e-mail reais, você pode confiar no Fire Temp Mail para manter sua caixa de entrada pessoal segura, privada e livre de spam.",
    guidesTitle: "Guias específicos da plataforma",
    guidesSubtitle: "Aprenda a usar e-mail temporário para plataformas populares e proteja sua privacidade",
    discordGuide: {
      title: "Discord Temp Mail",
      description: "Crie contas Discord sem expor seu e-mail pessoal. Guia completo de verificação."
    },
    instagramGuide: {
      title: "Instagram E-mail temporário",
      description: "Inscreva-se no Instagram usando e-mail descartável. Evite spam e mantenha múltiplas contas."
    },
    tiktokGuide: {
      title: "TikTok E-mail temporário",
      description: "Crie contas TikTok com temp mail. Mantenha sua caixa de entrada limpa de e-mails promocionais."
    },
    techTitle: "A tecnologia por trás dos endereços de e-mail descartáveis",
    techIntro: "No mundo digital de hoje, os endereços de e-mail tornaram-se nossos passaportes online - essenciais para comunicação de trabalho, conexões comerciais, interações sociais e acesso a serviços. Quase todos os aplicativos e serviços online exigem um endereço de e-mail para registro, assim como programas de fidelidade, concursos e ofertas especiais.",
    deasTitle: "O que são endereços de e-mail descartáveis?",
    deasText: "Endereços de e-mail descartáveis (DEAs) fornecem uma solução inovadora para manter a privacidade online enquanto acessa serviços digitais. Esses endereços temporários permitem que você:",
    deasFeatures: {
      register: "Registre-se em serviços sem revelar seu e-mail principal",
      protect: "Proteja sua identidade de violações de dados e listas de spam",
      control: "Mantenha controle sobre sua pegada digital",
      expire: "Expire automaticamente após um período definido"
    },
    deasCompromise: "Quando um endereço descartável é comprometido ou começa a receber e-mails indesejados, você pode simplesmente retirá-lo sem afetar seus canais de comunicação principais.",
    usesTitle: "Usos práticos para endereços de e-mail temporários",
    uses: {
      trials: {
        title: "Testes gratuitos estendidos",
        text: "Muitos serviços de streaming como Netflix, Hulu e Amazon Prime oferecem testes de tempo limitado. Com e-mails descartáveis, você pode estender seus períodos de teste enquanto mantém acesso a esses serviços."
      },
      retail: {
        title: "Ofertas de varejo sem spam",
        text: "As lojas frequentemente solicitam endereços de e-mail para ofertas especiais, o que muitas vezes leva a spam promocional. E-mails temporários permitem que você acesse esses benefícios sem sobrecarregar sua caixa de entrada principal."
      },
      testing: {
        title: "Teste de aplicativos",
        text: "Desenvolvedores podem criar várias contas de teste usando e-mails descartáveis para avaliar minuciosamente seus aplicativos antes do lançamento público."
      },
      multiple: {
        title: "Gerenciamento de múltiplas contas",
        text: "Quando os serviços exigem contas separadas para diferentes propósitos (como gerenciar vários perfis de mídia social), e-mails descartáveis fornecem a separação necessária sem criar novas contas permanentes."
      },
      spam: {
        title: "Prevenção de spam",
        text: "Usar e-mails temporários para fóruns, grupos de discussão e formulários web reduz significativamente o spam em sua caixa de entrada principal."
      }
    },
    choosingTitle: "Escolhendo o serviço de e-mail descartável certo",
    choosingText: "Os melhores provedores de e-mail temporário oferecem:",
    choosingFeatures: {
      instant: "Geração instantânea de e-mail com um clique",
      privacy: "Sem registro ou coleta de informações pessoais",
      anonymous: "Anonimato completo para os usuários",
      unlimited: "Criação ilimitada de endereços de e-mail",
      inbox: "Funcionalidade de caixa de entrada temporária",
      interface: "Interface amigável ao usuário",
      custom: "Opções de endereço personalizáveis"
    },
    effectiveTitle: "Como usar endereços de e-mail descartáveis efetivamente",
    effectiveText: "Enquanto alguns usuários criam contas secundárias com provedores tradicionais como Gmail, essa abordagem requer gerenciar várias caixas de entrada. Serviços profissionais de e-mail descartável como Fire Temp Mail oferecem uma solução mais eficiente, fornecendo endereços temporários que encaminham para seu e-mail principal enquanto mantém separação completa.",
    effectiveAdvanced: "A funcionalidade avançada permite filtrar mensagens - enviando e-mails suspeitos diretamente para o lixo enquanto entrega comunicações importantes para sua caixa de entrada principal. Se um endereço for comprometido, você pode simplesmente desativá-lo sem afetar suas outras contas.",
    conclusionTitle: "Conclusão: Melhore sua privacidade online",
    conclusionText: "Implementar um sistema de e-mail descartável é uma estratégia eficaz para participar de fóruns online, salas de chat, serviços de compartilhamento de arquivos e quadros de avisos enquanto protege sua identidade principal. Ao usar endereços temporários do Fire Temp Mail, você garante que suas informações pessoais permaneçam seguras e sua caixa de entrada fique livre de spam indesejado. Assuma o controle de sua privacidade digital hoje com nosso serviço de e-mail temporário seguro e anônimo projetado para manter suas atividades online separadas de seus canais de comunicação pessoal."
  },
  ar: {
    title: "Fire Temp Mail - مولد البريد الإلكتروني المؤقت المجاني القابل للتصرف",
    subtitle: "أنشئ عنوان بريد إلكتروني مؤقت على الفور. حافظ على خصوصية عنوان بريدك الإلكتروني الحقيقي ونظف صندوق الوارد من الرسائل غير المرغوب فيها والبريد العشوائي.",
    gmailSection: {
      title: "مولد Gmail المؤقت: احصل على عنوان Gmail مؤقت مجاني على الفور",
      intro: "أنشئ عنوان Gmail مؤقتًا كاملًا في ثوانٍ باستخدام مولد Gmail المؤقت المتقدم الخاص بنا. احصل على عنوان Gmail مجاني قابل للتصرف يعمل تمامًا مثل حساب Gmail حقيقي - مثالي للتسجيل في أي موقع ويب دون الكشف عن بريدك الإلكتروني الشخصي.",
      whyTitle: "لماذا تستخدم عنوان Gmail مؤقت؟",
      whyText: "احمِ صندوق الوارد الرئيسي من البريد العشوائي ورسائل البريد الإلكتروني التسويقية وانتهاكات البيانات المحتملة. يوفر مولد Gmail المؤقت الخاص بنا بديلاً خاصًا وآمنًا لجميع عمليات التسجيل والتحقق والتجارب عبر الإنترنت. حافظ على Gmail الشخصي نظيفًا ومنظمًا مع الحفاظ على الخصوصية الكاملة.",
      features: {
        instant: "إنشاء عنوان Gmail فوري - لا يلزم التسجيل",
        real: "عناوين Gmail حقيقية تعمل على جميع المنصات والمواقع",
        free: "خدمة Gmail مؤقتة مجانية تمامًا بدون تكاليف خفية",
        bypass: "مثالي لتجاوز حظر التحقق من البريد الإلكتروني والقيود"
      },
      howTitle: "كيفية الحصول على Gmail المؤقت الخاص بك",
      howText: "الحصول على عنوان Gmail المؤقت الخاص بك أمر بسيط. ما عليك سوى تحديد خيار Gmail وإنشاء بريدك الإلكتروني المؤقت. استخدمه على الفور لأي تسجيل موقع ويب أو تحقق من التطبيق أو تسجيل خدمة. ستظهر رسائلك على الفور في صندوق الوارد الخاص.",
      idealTitle: "مثالي لجميع احتياجاتك عبر الإنترنت",
      idealText: "خدمة Gmail المؤقت لدينا مثالية للتجارب المجانية وتسجيلات وسائل التواصل الاجتماعي وتسجيلات مواقع الويب والتحقق من التطبيقات واشتراكات النشرات الإخبارية والاتصالات المؤقتة. عند الانتهاء، ما عليك سوى التخلص من العنوان - لن تترك أي آثار.",
      cta: "هل أنت مستعد لحماية خصوصيتك؟ أنشئ عنوان Gmail المؤقت المجاني الآن واستمتع بالتسجيلات الآمنة الخالية من البريد العشوائي عبر جميع المنصات."
    },
    whatIsTitle: "ما هو البريد الإلكتروني المؤقت القابل للتصرف؟",
    whatIsText: "عنوان البريد الإلكتروني القابل للتصرف هو خدمة بريد إلكتروني مؤقتة مجانية تنشئ صندوق وارد قصير الأجل لتلقي رسائل البريد الإلكتروني. غالبًا ما يُطلق عليه tempmail أو 10minmail أو البريد القابل للتصرف أو burner mail، فهو يساعدك على تجنب البريد العشوائي وحماية بريدك الرئيسي. بدلاً من كشف حسابات البريد الإلكتروني الحقيقية، يمكنك الاعتماد على Fire Temp Mail للحفاظ على صندوق الوارد الشخصي آمنًا وخاصًا وخاليًا من البريد العشوائي.",
    guidesTitle: "أدلة خاصة بالمنصة",
    guidesSubtitle: "تعلم كيفية استخدام البريد الإلكتروني المؤقت للمنصات الشائعة وحماية خصوصيتك",
    discordGuide: {
      title: "Discord بريد مؤقت",
      description: "أنشئ حسابات Discord دون كشف بريدك الإلكتروني الشخصي. دليل التحقق الكامل."
    },
    instagramGuide: {
      title: "Instagram بريد إلكتروني مؤقت",
      description: "سجل في Instagram باستخدام بريد إلكتروني قابل للتصرف. تجنب البريد العشوائي وحافظ على حسابات متعددة."
    },
    tiktokGuide: {
      title: "TikTok بريد إلكتروني مؤقت",
      description: "أنشئ حسابات TikTok باستخدام البريد المؤقت. حافظ على صندوق الوارد نظيفًا من رسائل البريد الترويجية."
    },
    techTitle: "التكنولوجيا وراء عناوين البريد الإلكتروني القابلة للتصرف",
    techIntro: "في عالم اليوم الرقمي، أصبحت عناوين البريد الإلكتروني جوازات سفرنا عبر الإنترنت - ضرورية للتواصل في العمل والاتصالات التجارية والتفاعلات الاجتماعية والوصول إلى الخدمات. تتطلب جميع التطبيقات والخدمات عبر الإنترنت تقريبًا عنوان بريد إلكتروني للتسجيل، مثل برامج الولاء والمسابقات والعروض الخاصة.",
    deasTitle: "ما هي عناوين البريد الإلكتروني القابلة للتصرف؟",
    deasText: "توفر عناوين البريد الإلكتروني القابلة للتصرف (DEAs) حلاً مبتكرًا للحفاظ على الخصوصية عبر الإنترنت أثناء الوصول إلى الخدمات الرقمية. تتيح لك هذه العناوين المؤقتة:",
    deasFeatures: {
      register: "التسجيل في الخدمات دون الكشف عن بريدك الرئيسي",
      protect: "حماية هويتك من انتهاكات البيانات وقوائم البريد العشوائي",
      control: "الحفاظ على التحكم في بصمتك الرقمية",
      expire: "انتهاء الصلاحية تلقائيًا بعد فترة محددة"
    },
    deasCompromise: "عندما يتم اختراق عنوان قابل للتصرف أو يبدأ في تلقي رسائل بريد إلكتروني غير مرغوب فيها، يمكنك ببساطة إزالته دون التأثير على قنوات الاتصال الرئيسية.",
    usesTitle: "الاستخدامات العملية لعناوين البريد الإلكتروني المؤقتة",
    uses: {
      trials: {
        title: "تجارب مجانية ممتدة",
        text: "تقدم العديد من خدمات البث مثل Netflix و Hulu و Amazon Prime تجارب محدودة المدة. باستخدام رسائل البريد الإلكتروني القابلة للتصرف، يمكنك تمديد فترات التجربة مع الحفاظ على الوصول إلى هذه الخدمات."
      },
      retail: {
        title: "عروض البيع بالتجزئة بدون بريد عشوائي",
        text: "تطلب المتاجر بشكل متكرر عناوين بريد إلكتروني للعروض الخاصة، مما يؤدي غالبًا إلى البريد الترويجي العشوائي. تتيح لك رسائل البريد الإلكتروني المؤقتة الوصول إلى هذه الفوائد دون إزعاج صندوق الوارد الرئيسي."
      },
      testing: {
        title: "اختبار التطبيقات",
        text: "يمكن للمطورين إنشاء حسابات اختبار متعددة باستخدام رسائل بريد إلكتروني قابلة للتصرف لتقييم تطبيقاتهم بدقة قبل الإصدار العام."
      },
      multiple: {
        title: "إدارة حسابات متعددة",
        text: "عندما تتطلب الخدمات حسابات منفصلة لأغراض مختلفة (مثل إدارة ملفات تعريف وسائل التواصل الاجتماعي المتعددة)، توفر رسائل البريد الإلكتروني القابلة للتصرف الفصل الضروري دون إنشاء حسابات جديدة دائمة."
      },
      spam: {
        title: "منع البريد العشوائي",
        text: "يؤدي استخدام رسائل البريد الإلكتروني المؤقتة للمنتديات ومجموعات النقاش ونماذج الويب إلى تقليل البريد العشوائي في صندوق الوارد الرئيسي بشكل كبير."
      }
    },
    choosingTitle: "اختيار خدمة البريد الإلكتروني القابلة للتصرف المناسبة",
    choosingText: "يقدم أفضل مزودي البريد الإلكتروني المؤقت:",
    choosingFeatures: {
      instant: "إنشاء بريد إلكتروني فوري بنقرة واحدة",
      privacy: "عدم التسجيل أو جمع المعلومات الشخصية",
      anonymous: "عدم الكشف عن الهوية الكامل للمستخدمين",
      unlimited: "إنشاء غير محدود لعناوين البريد الإلكتروني",
      inbox: "وظيفة صندوق الوارد المؤقت",
      interface: "واجهة سهلة الاستخدام",
      custom: "خيارات عنوان قابلة للتخصيص"
    },
    effectiveTitle: "كيفية استخدام عناوين البريد الإلكتروني القابلة للتصرف بفعالية",
    effectiveText: "بينما ينشئ بعض المستخدمين حسابات ثانوية مع مزودين تقليديين مثل Gmail، تتطلب هذه الطريقة إدارة صناديق وارد متعددة. تقدم خدمات البريد الإلكتروني القابلة للتصرف الاحترافية مثل Fire Temp Mail حلاً أكثر كفاءة من خلال توفير عناوين مؤقتة تُعيد التوجيه إلى بريدك الإلكتروني الرئيسي مع الحفاظ على الفصل الكامل.",
    effectiveAdvanced: "تتيح لك الوظائف المتقدمة تصفية الرسائل - إرسال رسائل البريد الإلكتروني المشبوهة مباشرة إلى سلة المهملات مع تسليم الاتصالات المهمة إلى صندوق الوارد الرئيسي. إذا تم اختراق عنوان، يمكنك ببساطة تعطيله دون التأثير على حساباتك الأخرى.",
    conclusionTitle: "الخلاصة: عزز خصوصيتك عبر الإنترنت",
    conclusionText: "يعد تنفيذ نظام بريد إلكتروني يمكن التخلص منه استراتيجية فعالة للمشاركة في المنتديات عبر الإنترنت وغرف الدردشة وخدمات مشاركة الملفات ولوحات الإعلانات مع حماية هويتك الأساسية. باستخدام عناوين مؤقتة من Fire Temp Mail، فإنك تضمن بقاء معلوماتك الشخصية آمنة وبقاء صندوق الوارد الخاص بك خاليًا من الرسائل غير المرغوب فيها. تحكم في خصوصيتك الرقمية اليوم مع خدمة البريد الإلكتروني المؤقت الآمنة والمجهولة المصممة للحفاظ على أنشطتك عبر الإنترنت منفصلة عن قنوات الاتصال الشخصية الخاصة بك."
  },
  ru: {
    title: "Fire Temp Mail – Ваш бесплатный генератор временной одноразовой электронной почты",
    subtitle: "Мгновенно создайте одноразовый адрес электронной почты. Сохраните свой настоящий адрес электронной почты приватным, а почтовый ящик чистым от нежелательных сообщений и спама.",
    gmailSection: {
      title: "Генератор временного Gmail: Получите бесплатный временный адрес Gmail мгновенно",
      intro: "Создайте полностью функциональный временный адрес Gmail за секунды с нашим продвинутым генератором временного Gmail. Получите бесплатный одноразовый адрес Gmail, который работает точно так же, как настоящий аккаунт Gmail – идеально подходит для регистрации на любом веб-сайте без раскрытия вашей личной электронной почты.",
      whyTitle: "Зачем использовать временный адрес Gmail?",
      whyText: "Защитите свой основной почтовый ящик от спама, маркетинговых писем и потенциальных утечек данных. Наш генератор временного Gmail предоставляет приватную, безопасную альтернативу для всех ваших онлайн-регистраций, верификаций и пробных версий. Держите свой личный Gmail чистым и организованным, сохраняя полную конфиденциальность.",
      features: {
        instant: "Мгновенная генерация адреса Gmail - регистрация не требуется",
        real: "Настоящие адреса Gmail, которые работают на всех платформах и веб-сайтах",
        free: "Полностью бесплатный сервис временного Gmail без скрытых затрат",
        bypass: "Идеально для обхода блокировок верификации электронной почты и ограничений"
      },
      howTitle: "Как получить ваш временный Gmail",
      howText: "Получить ваш одноразовый адрес Gmail просто. Просто выберите опцию Gmail и сгенерируйте вашу временную почту. Используйте её немедленно для любой регистрации на веб-сайте, верификации приложения или регистрации в сервисе. Ваши сообщения появятся мгновенно в вашем приватном почтовом ящике.",
      idealTitle: "Идеально для всех ваших онлайн-потребностей",
      idealText: "Наш сервис временного Gmail идеален для бесплатных пробных версий, регистраций в социальных сетях, регистраций на веб-сайтах, верификаций приложений, подписок на новостные рассылки и временных коммуникаций. Когда закончите, просто выбросьте адрес – никаких следов не осталось.",
      cta: "Готовы защитить вашу конфиденциальность? Создайте ваш бесплатный временный адрес Gmail сейчас и испытайте безопасные, свободные от спама регистрации на всех платформах."
    },
    whatIsTitle: "Что такое одноразовая временная электронная почта?",
    whatIsText: "Одноразовый адрес электронной почты – это бесплатный сервис временной электронной почты, который создает краткосрочный почтовый ящик для получения писем. Часто называемый tempmail, 10minmail, одноразовой почтой или burner mail, он помогает вам избежать спама и защитить вашу основную почту. Вместо того чтобы раскрывать ваши настоящие аккаунты электронной почты, вы можете полагаться на Fire Temp Mail, чтобы сохранить ваш личный почтовый ящик безопасным, приватным и свободным от спама.",
    guidesTitle: "Руководства для конкретных платформ",
    guidesSubtitle: "Узнайте, как использовать временную электронную почту для популярных платформ и защитить вашу конфиденциальность",
    discordGuide: {
      title: "Discord временная почта",
      description: "Создавайте аккаунты Discord, не раскрывая вашу личную электронную почту. Полное руководство по верификации."
    },
    instagramGuide: {
      title: "Instagram временная электронная почта",
      description: "Регистрируйтесь в Instagram, используя одноразовую почту. Избегайте спама и управляйте несколькими аккаунтами."
    },
    tiktokGuide: {
      title: "TikTok временная электронная почта",
      description: "Создавайте аккаунты TikTok с временной почтой. Держите ваш почтовый ящик чистым от рекламных писем."
    },
    techTitle: "Технология за одноразовыми адресами электронной почты",
    techIntro: "В сегодняшнем цифровом мире адреса электронной почты стали нашими онлайн-паспортами – необходимыми для рабочей коммуникации, деловых связей, социальных взаимодействий и доступа к сервисам. Почти все приложения и онлайн-сервисы требуют адрес электронной почты для регистрации, так же как и программы лояльности, конкурсы и специальные предложения.",
    deasTitle: "Что такое одноразовые адреса электронной почты?",
    deasText: "Одноразовые адреса электронной почты (DEAs) предоставляют инновационное решение для поддержания онлайн-конфиденциальности при доступе к цифровым сервисам. Эти временные адреса позволяют вам:",
    deasFeatures: {
      register: "Регистрироваться в сервисах, не раскрывая вашу основную почту",
      protect: "Защищать вашу личность от утечек данных и списков спама",
      control: "Поддерживать контроль над вашим цифровым следом",
      expire: "Автоматически истекать после установленного периода"
    },
    deasCompromise: "Когда одноразовый адрес скомпрометирован или начинает получать нежелательные письма, вы можете просто удалить его, не затрагивая ваши основные каналы коммуникации.",
    usesTitle: "Практические применения временных адресов электронной почты",
    uses: {
      trials: {
        title: "Расширенные бесплатные пробные версии",
        text: "Многие потоковые сервисы, такие как Netflix, Hulu и Amazon Prime, предлагают пробные версии с ограниченным сроком. С одноразовыми почтами вы можете продлить ваши пробные периоды, сохраняя доступ к этим сервисам."
      },
      retail: {
        title: "Розничные предложения без спама",
        text: "Магазины часто запрашивают адреса электронной почты для специальных предложений, что часто приводит к рекламному спаму. Временные почты позволяют вам получать доступ к этим преимуществам, не засоряя ваш основной почтовый ящик."
      },
      testing: {
        title: "Тестирование приложений",
        text: "Разработчики могут создавать несколько тестовых аккаунтов, используя одноразовые почты, чтобы тщательно оценить свои приложения перед публичным запуском."
      },
      multiple: {
        title: "Управление несколькими аккаунтами",
        text: "Когда сервисы требуют отдельные аккаунты для разных целей (например, управление несколькими профилями в социальных сетях), одноразовые почты обеспечивают необходимое разделение без создания новых постоянных аккаунтов."
      },
      spam: {
        title: "Предотвращение спама",
        text: "Использование временных почт для форумов, дискуссионных групп и веб-форм значительно уменьшает спам в вашем основном почтовом ящике."
      }
    },
    choosingTitle: "Выбор правильного сервиса одноразовой электронной почты",
    choosingText: "Лучшие провайдеры временной электронной почты предлагают:",
    choosingFeatures: {
      instant: "Мгновенную генерацию электронной почты одним кликом",
      privacy: "Отсутствие регистрации или сбора личной информации",
      anonymous: "Полную анонимность для пользователей",
      unlimited: "Неограниченное создание адресов электронной почты",
      inbox: "Функциональность временного почтового ящика",
      interface: "Удобный интерфейс",
      custom: "Настраиваемые опции адресов"
    },
    effectiveTitle: "Как эффективно использовать одноразовые адреса электронной почты",
    effectiveText: "В то время как некоторые пользователи создают вторичные аккаунты у традиционных провайдеров, таких как Gmail, этот подход требует управления несколькими почтовыми ящиками. Профессиональные сервисы одноразовой электронной почты, такие как Fire Temp Mail, предлагают более эффективное решение, предоставляя временные адреса, которые перенаправляют на вашу основную почту, сохраняя при этом полное разделение.",
    effectiveAdvanced: "Расширенная функциональность позволяет вам фильтровать сообщения – отправлять подозрительные письма прямо в корзину, доставляя важные сообщения в ваш основной почтовый ящик. Если адрес скомпрометирован, вы можете просто отключить его, не затрагивая ваши другие аккаунты.",
    conclusionTitle: "Заключение: Улучшите вашу онлайн-конфиденциальность",
    conclusionText: "Внедрение системы одноразовой электронной почты является эффективной стратегией для участия в онлайн-форумах, чатах, файлообменных сервисах и досках объявлений, защищая при этом вашу основную личность. Используя временные адреса от Fire Temp Mail, вы гарантируете, что ваша личная информация остается в безопасности, а ваш почтовый ящик остается свободным от нежелательного спама. Возьмите под контроль свою цифровую конфиденциальность сегодня с помощью нашего безопасного, анонимного сервиса временной электронной почты, разработанного для того, чтобы ваши онлайн-активности были отделены от ваших личных каналов связи."
  }
};

// Update each language file
Object.keys(homeTranslations).forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.home = homeTranslations[lang];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Updated ${lang}.json with complete homepage translations`);
  } catch (error) {
    console.error(`❌ Error updating ${lang}.json:`, error.message);
  }
});

console.log('\n🎉 All homepage translations completed!');
console.log('\nLanguages updated:');
console.log('✅ German (DE) - Complete');
console.log('✅ French (FR) - Complete');
console.log('✅ Portuguese (PT) - Complete');
console.log('✅ Arabic (AR) - Complete');
console.log('✅ Russian (RU) - Complete');
