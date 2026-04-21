import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'PT';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, any>> = {
  EN: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      galerie: 'Galerie',
      contact: 'Contact',
    },
    home: {
      hero: {
        tagline: 'Human Performance Environments',
        cta: 'Explore Projects',
        visit: 'Schedule a Visit',
        nordic: 'Nordic Construction - Algarve Living',
        title: 'We create Human Performance Environments.',
      },
      philosophy: {
        subtitle: 'We create Nordic-standard & -quality homes in Portugal',
        p1: 'We do not merely build houses.',
        p2: 'We create Human Performance Environments — residences engineered for longevity, health, and measurable performance.',
        p3: 'Where others decorate, we design.',
        p4: 'Where others sell lifestyle, we construct systems.',
      },
      featured: {
        title: 'Featured Projects',
        subtitle: 'A selection of our latest architectural works.',
        viewAll: 'View All',
      },
      pillars: {
        comfort: {
          name: 'Comfort',
          tagline: 'Come Home, Let Go',
          description: 'Step inside and feel the tension leave your body. Warm floors beneath bare feet, pure air that fills your lungs effortlessly, and a gentle warmth that wraps around you — no cold corners, no drafts, just deep physical comfort that lets you fully unwind from the moment you walk in.',
          stat: '21-23°C',
          statLabel: 'ALWAYS WARM',
        },
        light: {
          name: 'Light',
          tagline: 'Wake Naturally, Sleep Deeply',
          description: 'Mornings filled with soft, energising daylight that gently wakes your body. Evenings that dim into warm, calming tones so your mind naturally winds down. No alarms forcing you awake, no screens keeping you up — just light that moves with your rhythm, helping you feel rested, focused, and alive.',
          stat: '100%',
          statLabel: 'NATURAL RHYTHM',
        },
        space: {
          name: 'Space',
          tagline: 'Room to Breathe, Space to Think',
          description: "A home where silence isn't empty — it's restorative. Where every room feels open yet intimate, calm yet alive. The kind of space where your shoulders drop, your breathing slows, and creative thoughts return. Designed not just for living, but for recovering, reflecting, and reconnecting with yourself.",
          stat: '∞',
          statLabel: 'INNER CALM',
        },
        wellbeing: {
          name: 'Wellbeing',
          tagline: 'Recharge Body & Mind',
          description: 'From the deep warmth of your private sauna to the sharp awakening rush of an ice bath — your body resets, stress melts away, and energy returns. Combined with pure air, circadian light, and restorative spaces, every day brings better sleep, clearer thinking, and more vitality. Health isn\'t a discipline here — it\'s simply how you live.',
          stat: 'A+',
          statLabel: 'VITALITY',
        },
      },
      services: {
        title: 'Where others sell lifestyle, we construct systems.',
        s1: {
          title: 'Thermal Mass Engineering',
          desc: 'Structures that naturally regulate temperature, reducing reliance on artificial climate control while maintaining optimal comfort.',
        },
        s2: {
          title: 'Acoustic Isolation',
          desc: 'Precision-engineered materials and spatial design that eliminate external noise pollution, creating sanctuaries of absolute silence.',
        },
        s3: {
          title: 'Biophilic Integration',
          desc: 'Seamless connection between interior spaces and the natural environment, proven to reduce stress and enhance cognitive function.',
        },
      },
      partnership: {
        tag: 'Strategic Partnership',
        title: 'Real Builder Academy',
        p1: 'ELEMENTS ALGARVE partners with Real Builder Academy to bring exceptional development expertise and educational resources to our projects.',
        p2: 'This partnership enables us to maintain the highest construction standards while providing transparent, educational insights into the development process for our clients.',
        cta: 'Visit Real Builder Academy',
      }
    },
    projects: {
      title: 'Projects',
      subtitle: 'Architectural responses to the human condition.',
      status: {
        comingSoon: 'Coming Soon',
        inDevelopment: 'In Development',
        available: 'Available'
      },
      data: {
        'escarpa-boa-vista': {
          name: 'ESCARPA BOA VISTA',
          location: 'Salema, Algarve',
          description: 'A dramatic cliff-edge residence overlooking the Atlantic, where architecture meets the elements in perfect harmony. Engineered for longevity and sensory performance.'
        },
        'panoramico': {
          name: 'PANORAMICO',
          location: 'Boliqueime, Algarve',
          description: 'Elevated living with 360-degree views of the Algarve coastline. A masterclass in thermal mass engineering and biophilic integration.'
        },
        'tavira-residences': {
          name: 'TAVIRA RESIDENCES',
          location: 'Tavira, Algarve',
          description: 'A collection of 15 premium apartments in the heart of Tavira, blending historical context with modern performance standards.'
        },
        'villa-quinta-do-lago': {
          name: 'VILLA QUINTA DO LAGO',
          location: 'Quinta do Lago, Algarve',
          description: 'Unrivaled luxury with private lake access. This estate represents the pinnacle of our Nordic-standard construction in the Algarve.'
        },
        'casa-da-natureza': {
          name: 'CASA DA NATUREZA',
          location: 'Monchique, Algarve',
          description: 'A secluded sanctuary embedded in the Monchique forest. Minimal form meets maximum acoustic isolation for absolute restorative silence.'
        },
        'alma-luz': {
          name: 'ALMA LUZ',
          location: 'Luz de Tavira, Algarve',
          description: 'Three sculptural townhouses designed for seamless inside-outside living, featuring rooftop sanctuaries with private wellness facilities.'
        },
        'casa-raul-lino': {
          name: 'CASA RAUL LINO',
          location: 'Azeitão, Setúbal',
          description: 'A heritage masterpiece restored to modern performance standards. Exploring the Luso-Moorish influences through a contemporary lens.'
        },
        'casa-luz': {
          name: 'CASA LUZ',
          location: 'Praia da Luz, Algarve',
          description: 'A singular acquisition in one of Europe\'s most desirable coastal regions. Designed for longevity, health, and measurable performance.'
        }
      }
    },
    projectDetail: {
      concept: 'Concept',
      specs: 'Specifications',
      internalArea: 'Internal Area',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      location: 'Location',
      scroll: 'Scroll to explore',
      visionTitle: 'Pure Architectural<br/>Vision',
      visionDesc: 'Raul Lino was an influential Portuguese architect, known for projects like the "Casa Portuguesa" and "Casa do Cipreste". His work reflects a unique style, exploring the Portuguese way of life and Luso-Moorish influences.',
      materials: 'Materials & Craftsmanship',
      comfortTitle: 'Comfort Living through thoughtful Layout',
      techTitle: 'Technology & Sustainability',
      investmentTitle: 'A Singular Investment',
      investmentDesc: 'Beyond lifestyle, this property represents a strategic acquisition in one of Europe\'s most desirable coastal regions.',
      viewing: 'Exclusive viewings by appointment only',
      inquireTitle: 'Inquire',
      inquireSubtitle: 'Request details for',
      form: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        message: 'Message',
        subject: 'Subject',
        subjects: {
          visit: 'Schedule a visit',
          info: 'Ask for Information'
        },
        submit: 'Send Request',
        placeholderName: 'Your name',
        placeholderPhone: '+351 ...',
        placeholderEmail: 'your@email.com',
        placeholderMessage: 'How can we help?',
        beds: 'Beds',
      },
      materialsList: [
        "Micro-cement floors and walls in warm, natural tones",
        "Premium natural wood accents",
        "Floor-to-ceiling glass façades",
        "Custom sculptural elements",
        "Desert garden landscaping"
      ],
      comfortItems: [
        { title: "3 Suites", desc: "3 Master Suites, each 25 m²" },
        { title: "3 Bathrooms", desc: "Premium fixtures" },
        { title: "Atrium", desc: "Central courtyard for natural light and airflow" },
        { title: "Inside Outside Living", desc: "Seamless indoor-outdoor flow" },
        { title: "Rooftop BBQ", desc: "Outdoor entertaining space" },
        { title: "Gym & Spa", desc: "Sauna / Ice Bath / Yoga / Mindfulness" },
        { title: "Lightboxes", desc: "Architectural lighting features" },
        { title: "Fully Furnished", desc: "Turn-key ready — come with your trolley and move in" },
      ],
      techItems: [
        "AC", "Floor Heating (Water)", "Air Recovery Ventilation", "Humidity Control", "Solar Panel PV", "Battery Storage", "Smart Home", "Car Charger", "Low Maintenance", "Premium Isolation"
      ],
      investmentItems: [
        { title: "Strong Value Growth", desc: "The Eastern Algarve continues to see robust appreciation, with premium properties in high demand from international buyers." },
        { title: "Ultra-Rare Design", desc: "Modern architectural masterpieces of this caliber are exceptionally scarce in the Algarve, making this a truly unique opportunity." },
        { title: "Rental Potential", desc: "Luxury villas in Luz de Tavira command premium rental rates, offering excellent returns for investment-minded owners." },
      ],
    },
    galerie: {
      title: 'Exhibition',
      subtitle: 'A curated study of materials, light, and architectural silence.',
      titles: [
        "Light Study I",
        "Material Texture",
        "Vertical Perspective",
        "Minimal Form",
        "Horizon Line",
        "Detail IV",
        "Shadow Play",
        "Atmosphere",
        "Final Form"
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s discuss your next performance environment.',
      form: {
        name: 'Name',
        nameLabel: 'Your Name',
        email: 'Email',
        emailLabel: 'Inquiry Email',
        subject: 'Subject',
        subjects: {
          houses: 'Houses',
          info: 'General Info',
          help: 'Help'
        },
        message: 'Message',
        messageLabel: 'Your Message',
        submit: 'Send Message',
      },
      info: {
        hq: 'Headquarters',
        direct: 'Direct Contact',
      }
    },
    footer: {
      desc: 'Residences engineered for longevity, health, and measurable performance. Where others decorate, we design.',
      location: 'Tavira, Portugal',
      complaints: 'Complaint Book',
      developedBy: 'Website developed by',
    },
    legal: {
      terms: {
        title: 'Terms & Conditions',
        sections: [
          { 
            title: '1. Introduction', 
            content: [
              'Welcome to Elements Algarve. By accessing our website, you agree to these terms and conditions in full.',
              'All architectural designs, renderings, and content shown are the exclusive property of Elements Algarve and are protected by international intellectual property laws.'
            ] 
          },
          { 
            title: '2. Informational Purpose', 
            content: [
              'The content provided on this website is for informational and marketing purposes only and does not constitute a binding contract.',
              'We reserve the right to modify project specifications, dimensions, materials, or availability at any time without prior notice.'
            ] 
          }
        ]
      },
      privacy: {
        title: 'Privacy Policy',
        sections: [
          { 
            title: '1. Data Collection', 
            content: [
              'We collect personal information (such as name, email, and phone number) exclusively through our contact forms when you voluntarily provide it.',
              'This data is used solely to respond to your inquiries and provide details about our performance environments.'
            ] 
          },
          { 
            title: '2. Confidentiality', 
            content: [
              'Your data is treated with absolute confidentiality. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.',
              'We implement state-of-the-art security measures to maintain the safety of your personal information.'
            ] 
          }
        ]
      },
      cookies: {
        title: 'Cookie Policy',
        sections: [
          {
            title: '1. What are Cookies?',
            content: [
              'Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.'
            ]
          },
          {
            title: '2. How we use Cookies',
            content: [
              'Functional Cookies: These are essential for the website to function properly, such as remembering your language preference.',
              'Analytical Cookies: If you consent, we may use these to understand how visitors interact with our website, helping us improve our services.'
            ]
          },
          {
            title: '3. Your Choices',
            content: [
              'You can choose to accept or decline cookies. Declining analytical cookies will not affect your ability to use the essential features of our website.'
            ]
          }
        ],
        banner: {
          message: 'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.',
          accept: 'Accept',
          decline: 'Decline',
          policy: 'Cookie Policy'
        }
      },
      privacyAgreement: 'I agree to the privacy policy and consent to the collection of my data for inquiry purposes.'
    }
  },
  PT: {
    nav: {
      home: 'Início',
      projects: 'Projetos',
      galerie: 'Galeria',
      contact: 'Contacto',
    },
    home: {
      hero: {
        tagline: 'Ambientes de Performance Humana',
        cta: 'Explorar Projetos',
        visit: 'Marcar Visita',
        nordic: 'Construção Nórdica - Viver no Algarve',
        title: 'Criamos Ambientes de Performance Humana.',
      },
      philosophy: {
        subtitle: 'Criamos casas com padrão e qualidade nórdica em Portugal',
        p1: 'Não construímos apenas casas.',
        p2: 'Criamos Ambientes de Performance Humana — residências projetadas para longevidade, saúde e performance mensurável.',
        p3: 'Onde outros decoram, nós projetamos.',
        p4: 'Onde outros vendem estilo de vida, nós construímos sistemas.',
      },
      featured: {
        title: 'Projetos em Destaque',
        subtitle: 'Uma seleção das nossas mais recentes obras arquitetónicas.',
        viewAll: 'Ver Todos',
      },
      pillars: {
        comfort: {
          name: 'Conforto',
          tagline: 'Chegue a Casa, Descontraia',
          description: 'Entre e sinta a tensão sair do seu corpo. Chãos quentes sob os pés descalços, ar puro que enche os pulmões sem esforço e um calor suave que o envolve — sem cantos frios, sem correntes de ar, apenas um conforto físico profundo que lhe permite relaxar totalmente desde o momento em que entra.',
          stat: '21-23°C',
          statLabel: 'SEMPRE QUENTE',
        },
        light: {
          name: 'Luz',
          tagline: 'Acorde Naturalmente, Durma Profundamente',
          description: 'Manhãs cheias de luz natural suave e energizante que acorda suavemente o seu corpo. Noites que diminuem para tons quentes e calmantes para que a sua mente relaxe naturalmente. Sem alarmes a forçá-lo a acordar — apenas luz que se move com o seu ritmo.',
          stat: '100%',
          statLabel: 'RITMO NATURAL',
        },
        space: {
          name: 'Espaço',
          tagline: 'Espaço para Respirar e Pensar',
          description: "Uma casa onde o silêncio não é vazio — é restaurador. Onde cada divisão parece aberta mas íntima, calma mas viva. O tipo de espaço onde os seus ombros descem, a sua respiração abranda e os pensamentos criativos regressam.",
          stat: '∞',
          statLabel: 'CALMA INTERIOR',
        },
        wellbeing: {
          name: 'Bem-estar',
          tagline: 'Recarregue Corpo e Mente',
          description: 'Do calor profundo da sua sauna privada ao despertar revigorante de um banho de gelo — o seu corpo reinicia, o stress desaparece e a energia regressa. Combinado com ar puro e luz circadiana, cada dia traz melhor sono e mais vitalidade.',
          stat: 'A+',
          statLabel: 'VITALIDADE',
        },
      },
      services: {
        title: 'Onde outros vendem estilo de vida, nós construímos sistemas.',
        s1: {
          title: 'Engenharia de Massa Térmica',
          desc: 'Estruturas que regulam naturalmente a temperatura, reduzindo a dependência de climatização artificial enquanto mantêm o conforto ideal.',
        },
        s2: {
          title: 'Isolamento Acústico',
          desc: 'Materiais de engenharia de precisão e design espacial que eliminam a poluição sonora externa, criando santuários de silêncio absoluto.',
        },
        s3: {
          title: 'Integração Biofílica',
          desc: 'Ligação perfeita entre os espaços interiores e o ambiente natural, comprovada para reduzir o stress e melhorar a função cognitiva.',
        },
      },
      partnership: {
        tag: 'Parceria Estratégica',
        title: 'Real Builder Academy',
        p1: 'A ELEMENTS ALGARVE associa-se à Real Builder Academy para trazer conhecimentos excecionais de desenvolvimento e recursos educativos aos nossos projetos.',
        p2: 'Esta parceria permite-nos manter os mais elevados padrões de construção, fornecendo ao mesmo tempo informações transparentes e educativas sobre o processo de desenvolvimento para os nossos clientes.',
        cta: 'Visitar Real Builder Academy',
      }
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Respostas arquitetónicas à condição humana.',
      status: {
        comingSoon: 'Brevemente',
        inDevelopment: 'Em Desenvolvimento',
        available: 'Disponível'
      },
      data: {
        'escarpa-boa-vista': {
          name: 'ESCARPA BOA VISTA',
          location: 'Salema, Algarve',
          description: 'Uma residência dramática à beira da falésia com vista para o Atlântico, onde a arquitetura se encontra com os elementos em perfeita harmonia. Projetada para longevidade e performance sensorial.'
        },
        'panoramico': {
          name: 'PANORAMICO',
          location: 'Boliqueime, Algarve',
          description: 'Vida elevada com vistas de 360 graus da costa algarvia. Uma aula de mestre em engenharia de massa térmica e integração biofílica.'
        },
        'tavira-residences': {
          name: 'TAVIRA RESIDENCES',
          location: 'Tavira, Algarve',
          description: 'Uma coleção de 15 apartamentos premium no coração de Tavira, fundindo o contexto histórico com padrões modernos de performance.'
        },
        'villa-quinta-do-lago': {
          name: 'VILLA QUINTA DO LAGO',
          location: 'Quinta do Lago, Algarve',
          description: 'Luxo inigualável com acesso privado ao lago. Esta propriedade representa o auge da nossa construção de padrão nórdico no Algarve.'
        },
        'casa-da-natureza': {
          name: 'CASA DA NATUREZA',
          location: 'Monchique, Algarve',
          description: 'Um santuário isolado inserido na floresta de Monchique. Forma minimalista encontra o isolamento acústico máximo para um silêncio restaurador absoluto.'
        },
        'alma-luz': {
          name: 'ALMA LUZ',
          location: 'Luz de Tavira, Algarve',
          description: 'Três moradias esculturais concebidas para uma vivência interior-exterior contínua, com santuários no telhado e instalações de bem-estar privadas.'
        },
        'casa-raul-lino': {
          name: 'CASA RAUL LINO',
          location: 'Azeitão, Setúbal',
          description: 'Uma obra-prima histórica restaurada para padrões modernos de performance. Explorando as influências luso-mouriscas através de uma lente contemporânea.'
        },
        'casa-luz': {
          name: 'CASA LUZ',
          location: 'Praia da Luz, Algarve',
          description: 'Uma aquisição singular numa das regiões costeiras mais desejáveis da Europa. Concebida para longevidade, saúde e performance mensurável.'
        }
      }
    },
    projectDetail: {
      concept: 'Conceito',
      specs: 'Especificações',
      internalArea: 'Área Interna',
      bedrooms: 'Quartos',
      bathrooms: 'Casas de Banho',
      location: 'Localização',
      scroll: 'Deslize para explorar',
      visionTitle: 'Visão Arquitetónica<br/>Pura',
      visionDesc: 'Raul Lino foi um influente arquiteto português, conhecido por projetos como a "Casa Portuguesa" e a "Casa do Cipreste". A sua obra reflete um estilo único, explorando o modo de vida português e influências luso-mouriscas.',
      materials: 'Materiais e Artesanato',
      comfortTitle: 'Vida Confortável através de um Layout Cuidadoso',
      techTitle: 'Tecnologia e Sustentabilidade',
      investmentTitle: 'Um Investimento Singular',
      investmentDesc: 'Além do estilo de vida, esta propriedade representa uma aquisição estratégica numa das regiões costeiras mais desejadas da Europa.',
      viewing: 'Visitas exclusivas apenas por marcação',
      inquireTitle: 'Inquire',
      inquireSubtitle: 'Solicitar detalhes para',
      form: {
        name: 'Nome',
        phone: 'Telemóvel',
        email: 'Email',
        message: 'Mensagem',
        subject: 'Assunto',
        subjects: {
          visit: 'Agendar uma visita',
          info: 'Pedir Informação'
        },
        submit: 'Enviar Pedido',
        placeholderName: 'Seu nome',
        placeholderPhone: '+351 ...',
        placeholderEmail: 'seu@email.com',
        placeholderMessage: 'Como podemos ajudar?',
        beds: 'Quartos',
      },
      materialsList: [
        "Pisos e paredes de microcimento em tons quentes e naturais",
        "Acabamentos em madeira natural premium",
        "Fachadas de vidro do chão ao teto",
        "Elementos esculturais personalizados",
        "Paisagismo de jardim desértico"
      ],
      comfortItems: [
        { title: "3 Suites", desc: "3 Suites Master, cada uma com 25 m²" },
        { title: "3 Casas de Banho", desc: "Acessórios premium" },
        { title: "Átrio", desc: "Pátio central para luz natural e fluxo de ar" },
        { title: "Vida Interior e Exterior", desc: "Fluxo contínuo entre interior e exterior" },
        { title: "BBQ no Rooftop", desc: "Espaço de entretenimento ao ar livre" },
        { title: "Ginásio e Spa", desc: "Sauna / Banho de Gelo / Yoga / Mindfulness" },
        { title: "Lightboxes", desc: "Recursos de iluminação arquitetónica" },
        { title: "Totalmente Mobilado", desc: "Pronto a habitar — venha apenas com a sua mala" },
      ],
      techItems: [
        "AC", "Piso Radiante (Água)", "Ventilação com Recuperação de Ar", "Controlo de Humidade", "Painéis Solares PV", "Armazenamento de Bateria", "Smart Home", "Carregador de Carro", "Baixa Manutenção", "Isolamento Premium"
      ],
      investmentItems: [
        { title: "Forte Crescimento de Valor", desc: "O Sotavento Algarvio continua a registar uma valorização robusta, com elevada procura por parte de compradores internacionais." },
        { title: "Design Ultra-Raro", desc: "Obras-primas arquitetónicas modernas deste calibre são excecionalmente escassas no Algarve, tornando esta uma oportunidade única." },
        { title: "Potencial de Arrendamento", desc: "Villas de luxo em Luz de Tavira comandam taxas de aluguer premium, oferecendo excelentes retornos." },
      ],
    },
    galerie: {
      title: 'Exposição',
      subtitle: 'Um estudo curado de materiais, luz e silêncio arquitetónico.',
      titles: [
        "Estudo de Luz I",
        "Textura de Material",
        "Perspetiva Vertical",
        "Forma Minimalista",
        "Linha do Horizonte",
        "Detalhe IV",
        "Jogo de Sombras",
        "Atmosfera",
        "Forma Final"
      ]
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Vamos discutir o seu próximo ambiente de performance.',
      form: {
        name: 'Nome',
        nameLabel: 'Seu Nome',
        email: 'E-mail',
        emailLabel: 'E-mail de Contacto',
        subject: 'Assunto',
        subjects: {
          houses: 'Casas',
          info: 'Informação Geral',
          help: 'Ajuda'
        },
        message: 'Mensagem',
        messageLabel: 'Sua Mensagem',
        submit: 'Enviar Mensagem',
      },
      info: {
        hq: 'Sede',
        direct: 'Contacto Direto',
      }
    },
    footer: {
      desc: 'Residências projetadas para longevidade, saúde e performance mensurável. Onde outros decoram, nós projetamos.',
      location: 'Tavira, Portugal',
      complaints: 'Livro de Reclamações',
      developedBy: 'Website desenvolvido por',
    },
    legal: {
      terms: {
        title: 'Termos e Condições',
        sections: [
          { 
            title: '1. Introdução', 
            content: [
              'Bem-vindo ao Elements Algarve. Ao aceder ao nosso website, concorda integralmente com estes termos e condições.',
              'Todos os designs arquitetónicos, representações e conteúdos apresentados são propriedade exclusiva da Elements Algarve e estão protegidos pelas leis internacionais de propriedade intelectual.'
            ] 
          },
          { 
            title: '2. Fins Informativos', 
            content: [
              'O conteúdo fornecido neste website destina-se apenas a fins informativos e de marketing e não constitui um contrato vinculativo.',
              'Reservamos o direito de modificar as especificações, dimensões, materiais ou disponibilidade dos projetos a qualquer momento e sem aviso prévio.'
            ] 
          }
        ]
      },
      privacy: {
        title: 'Política de Privacidade',
        sections: [
          { 
            title: '1. Recolha de Dados', 
            content: [
              'Recolhemos informações pessoais (como nome, e-mail e número de telefone) exclusivamente através dos nossos formulários de contacto quando as fornece voluntariamente.',
              'Estes dados são utilizados apenas para responder aos seus pedidos e fornecer detalhes sobre os nossos ambientes de performance.'
            ] 
          },
          { 
            title: '2. Confidencialidade', 
            content: [
              'Os seus dados são tratados com absoluta confidencialidade. Não vendemos, trocamos ou transferimos as suas informações pessoalmente identificáveis para terceiros.',
              'Implementamos medidas de segurança de ponta para manter a segurança das suas informações pessoais.'
            ] 
          }
        ]
      },
      cookies: {
        title: 'Política de Cookies',
        sections: [
          {
            title: '1. O que são Cookies?',
            content: [
              'Os cookies são pequenos ficheiros de texto que são guardados no seu computador ou dispositivo móvel quando visita um website. São amplamente utilizados para fazer com que os websites funcionem, ou funcionem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.'
            ]
          },
          {
            title: '2. Como utilizamos os Cookies',
            content: [
              'Cookies Funcionais: São essenciais para o correto funcionamento do website, como por exemplo, lembrar a sua preferência de idioma.',
              'Cookies Analíticos: Se der o seu consentimento, poderemos utilizá-los para compreender como os visitantes interagem com o nosso website, ajudando-nos a melhorar os nossos serviços.'
            ]
          },
          {
            title: '3. As Suas Opções',
            content: [
              'Pode optar por aceitar ou recusar cookies. Recusar cookies analíticos não afetará a sua capacidade de utilizar as funcionalidades essenciais do nosso website.'
            ]
          }
        ],
        banner: {
          message: 'Utilizamos cookies para melhorar a sua experiência. Ao continuar a visitar este site, concorda com a nossa utilização de cookies.',
          accept: 'Aceitar',
          decline: 'Recusar',
          policy: 'Política de Cookies'
        }
      },
      privacyAgreement: 'Concordo com a política de privacidade e dou o meu consentimento para a recolha dos meus dados para fins de contacto.'
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved as Language) || 'EN';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = translations[lang];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
