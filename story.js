(function (root) {
  'use strict';
  const VERSION = 2;
  const option = (title, line, reaction, delta, tag, effects = {}) => ({ title, line, reaction, delta, tag, effects });
  const episodes = [
    {
      title: '这杯认亲酒，你前世喝过', place: '第一天深夜 / 沈家认亲宴', chapter: '他们等你回家，也等你认罪',
      text: '前世，你这个真少爷替沈屿扛下纵火案，坐了三年牢。出狱当天，你死在接你回家的车里。现在你重回认亲宴，离那场火还有七天。沈屿把酒递来，父亲笑着等你签「家人之间的小协议」。你记得，喝完这杯，自己就断了片。',
      quote: '沈屿：「哥，回了这个家，就别再把自己当外人。」',
      options: [
        option('笑着换杯：弟弟先替我喝一口', '当场拆他的戏，也让幕后的人知道你变了。', '沈屿伸手挡杯，酒泼了一桌。父亲第一次收起笑。你没喝酒，却从这一刻起成了他们必须提前处理的变数。', { proof: 2, heat: 2 }, 'flex', { opening: 'exposed' }),
        option('故意弄脏礼服，借换衣服进书房', '先让这场家宴继续演下去。', '书房门没锁，你看见一份早在认亲之前就拟好的代签文件。父亲根本没打算问你的意见。你拍下首页，原路回席。', { proof: 3, capital: 1 }, 'plan', { opening: 'shadow', signatureClue: true }),
        option('举杯之前，先让父亲把妹妹接来', '把你在乎的人放到眼前，再谈这个家。', '小满被带到席边。父亲给她夹菜，许诺以后照顾她。你看着这幅团圆景象，知道自己又把一个软肋交到了他手里。', { allies: 2, capital: 1 }, 'bond', { opening: 'family', sisterAtShen: true }),
        option('不认了。带小满从后门走', '这次，先把她从这栋房子里带出去。', '你连行李都没拿。父亲让司机记下你的去向。天亮前，你把小满安顿到沈家不知道的住处，代价是失去今晚近身查账的机会。', { capital: -1, heat: 1 }, 'free', { opening: 'leave', sisterSafe: true, escapeLead: true })
      ]
    },
    {
      title: '前世恨你的女人，拿出一纸婚约', place: '第一夜 / 顾明棠的车里', chapter: '谁在利用你，谁又能借你翻盘',
      text: '你刚离开宴席，顾明棠的车就堵住出口。她是沈家的死对头，前世你一直以为她在害你。可你死前最后看见的，是她冒雨追车。现在，她把婚约推过来：你有母亲留下的继承资格，她有钱和人。期限一年，婚礼明天。',
      quote: '顾明棠：「婚礼我办，仇你自己报。新郎明天别先死了。」',
      options: [
        option('婚约不签，只卖她一次进场资格', '你们合作，但你暂时不交出全部底牌。', '她用一笔预付款换来同席资格，没逼你解释。临走她说：「这点钱，买不来你死而复生的秘密吧？」你第一次怀疑她知道多少。', { capital: 3, heat: 1 }, 'flex', { pact: 'business', guContact: true }),
        option('拒绝她，回去找前未婚妻宋妍', '她前世劝过你签字，你想听她这次怎么说。', '宋妍仍说沈屿只是个孩子，却不敢看你的眼睛。她让你七号去旧厂清点，转身就把约定发给了沈屿。你装作没看见，记下这条安排。', { proof: 2, capital: 1 }, 'plan', { pact: 'song', songAccess: true }),
        option('签。你救我这一局，我陪你赌一年', '把她从可疑的对手，变成有代价的盟友。', '她当着你的面撕掉单方退出条款。结婚消息连夜传回沈家，你得到她的人手，也把她推到了父亲的对面。', { allies: 3, capital: 2, heat: 2 }, 'bond', { pact: 'marriage', guContact: true, guTrust: true }),
        option('谁的婚约都不接，我要一张离城车票', '她给你退路，你仍决定查完七天再走。', '顾明棠把两张车票放下，没问另一张给谁。你没上车。上一世失去的事还没查清，但这次至少有个能走的方向。', { capital: 1, heat: -1 }, 'free', { pact: 'none', escapeLead: true })
      ]
    },
    {
      title: '追上那辆车，还是救下这个人', place: '第二天 / 盘山路', chapter: '你只知道前世，不知道全部真相',
      text: '前世那场火之后，司机阿舟就消失了。你提前找到他，他正想把一只公文包交给你，一辆黑车却冲过来。阿舟翻下路边缓坡，公文包被黑车带走。你只有几秒：包里可能是证据，坡下可能是唯一会开口的人。',
      quote: '阿舟隔着雨声喊：「别……别信沈董！」',
      options: [
        option('先下去救阿舟，车以后再追', '留下一个人，放走一只包。', '救援人员赶到时，你已经陪阿舟等了半小时。他攥着你的袖口，说包里是当年旧厂的账。你失去了账，却留下了愿意当面指认的人。', { proof: 1, allies: 3 }, 'bond', { driverHelp: true, witness: true }),
        option('记住位置报警，自己盯住黑车', '救援交给专业的人，你去抢会被销毁的东西。', '阿舟被送去医院，黑车里的人弃包离开。你拿到旧账副本，可阿舟不肯接你的电话。他无法确定，你赶来是救他，还是只为那只包。', { proof: 3, heat: 2 }, 'plan', { ledger: true, driverHelp: false }),
        option('把两条线交给能信的人，自己赌一把', '如果没有盟友，这个决定就只能换成求援。', '你调动了手边能调动的一切，代价很快就会找上门。', { capital: -2, heat: 1 }, 'flex'),
        option('先离开这条路，护住自己的行踪', '你前世就死在一辆车里，恐惧没有随重生消失。', '你报了位置，没有再追。天黑后传来阿舟获救的消息，公文包却不知所踪。你活着回去了，也知道有些线索不会再等一次。', { heat: -2, capital: 1 }, 'free', { driverHelp: false, escapeLead: true })
      ]
    },
    {
      title: '九千万的玉，和没人要的旧厂', place: '第三天 / 林家遗物拍卖', chapter: '他们争的宝贝，未必是你的底牌',
      text: '母亲林晚留下的东西被拿来拍卖。沈屿盯着一块九千万的血玉，全场都在等你这个真少爷出丑。你却记得：前世母亲的青禾旧厂被一元卖掉后，沈家突然拿到了一大笔钱。拍卖册最后，还有一只停在十二点的旧挂钟。',
      quote: '沈屿：「哥，别看了。母亲也没给你留几件值钱的。」',
      options: [
        option('把全部现钱押给旧厂，先拿住它', '你拿到一处阵地，也接下别人看不见的麻烦。', '你成了旧厂的买家。沈屿笑你买一堆负债，父亲却派人连夜取走厂里的档案。你第一次确定，这块没人要的地让他害怕。', { capital: -3, proof: 2, heat: 1 }, 'plan', { factory: true }),
        option('让他拍玉。我要母亲那只旧挂钟', '你放弃地和钱，赌母亲留下了别的东西。', '挂钟背板藏着一封未寄出的信和遗嘱副本：旧厂收益原本全部归你。信的最后一行被撕走，只剩「鸿川若接你回来，千万……」。', { proof: 3, capital: -1 }, 'free', { motherWill: true, clock: true }),
        option('用一半未来收益，请顾明棠替我买厂', '借她的势，等于让她也拿住你的命门。', '她不问你哪来的把握，只让你在分成处签字。厂到手了，你却不能再一个人说了算。沈屿举着血玉，第一次成了台上没人看的那一个。', { capital: -1, allies: 2, heat: 2 }, 'bond', { factory: true, guContact: true, sharedFactory: true }),
        option('把竞价抬上去，再把血玉让给沈屿', '先让他的钱被锁住，给自己换一口气。', '沈屿用掉了准备收厂的资金，你因此争到两天缓冲。可母亲的旧厂和遗物都落到别人手里，眼前的出气没有自动变成终局的胜利。', { capital: 3, heat: 2 }, 'flex', { auctionFeud: true })
      ]
    },
    {
      title: '那场火，提前了三天', place: '第四天 / 青禾旧厂', chapter: '你改了第一步，未来也改了',
      text: '你按前世记忆准备七号守厂，四号晚上却收到火警。档案室开始冒烟，三楼还有人。原本安排在今晚的清点，已经被沈家提前。你终于明白：你每改一次选择，敌人也会改一次计划。',
      quote: '电话那头：「三楼有人！档案室的门也快撑不住了！」',
      options: [
        option('先找人，旧账烧了就再找', '这一次，你不想再用一个人换一份材料。', '你等到被困的人出来，档案室已经不能靠近。救援人员让你退到警戒线外。你攥着空手，知道这个决定会让翻盘变难。', { allies: 3, heat: -1 }, 'bond'),
        option('守住被转移的原账，把位置交给救援队', '把救人交给现场指挥，你护住这次调查的原件。', '你守到那箱原账被完整移出。沈家的人也守到了你的照片。等你再去找人，父亲的人已经把获救者带走。', { proof: 4, capital: 1, heat: 3 }, 'plan', { ledger: true }),
        option('分头行动：我取账，另一个人去接人', '谁能替你接下另一头，要看你前面有没有留住人。', '这件事从来不是喊一声就能两全。', { capital: -2, heat: 2 }, 'flex'),
        option('盯住提前离场的沈屿，别让他消失', '你追这一次的纵火嫌疑人，也把救援交给了别人。', '你拍到沈屿和那个黑车司机碰头。他看见你时，表情不像凶手得意，更像有人正在把他也装进袋子。你找到了指向他的新线索。', { proof: 3, heat: 2 }, 'free', { fakeVideo: true })
      ]
    },
    {
      title: '你唯一的盟友，也在那份名单上', place: '第五天 / 顾明棠的旧公寓', chapter: '复仇的人，敢不敢再信一次',
      text: '你收到一份母亲出事前的转款名单，收款人里有顾明棠的父亲。她没有否认，只把封存多年的一页病中委托交给你：母亲曾托顾家保全旧厂。她说，今晚你信不信她都行，但沈鸿川已经开始查她的人。',
      quote: '顾明棠：「你要找凶手，还是只要一个能恨的人？」',
      options: [
        option('把名单交给父亲，换他开出条件', '你怀疑顾家，决定先借另一个敌人的手。', '父亲答应转你一部分股份，顾明棠的账户随即被查封。你拿到筹码，也亲手把一个可能站在你身边的人推到了门外。', { capital: 4, allies: -2, heat: 1 }, 'flex', { guBetrayed: true, guTrust: false, fatherDeal: true }),
        option('不选边。去找当年委托的见证人', '你要的是原件，今晚要自己走进另一个局。', '老律师让你看了留存的遗嘱材料，却拒绝立即出面。你带回了母亲留产的根据，离开时发现同一辆车已经跟了你三个路口。', { proof: 3, heat: 2 }, 'plan', { motherWill: true }),
        option('把自己查到的东西摊开，和她对上时间线', '先把刀放下，再决定要不要并肩。', '两份各缺一半的记录，拼出了母亲委托的原貌。顾明棠答应陪你把最后一程走完。你也答应，这次有危险，不再把她蒙在鼓里。', { proof: 2, allies: 3, heat: 1 }, 'bond', { guTrust: true, guContact: true }),
        option('收下原件，但不把妹妹和退路交给她', '你不再为了表忠心，把所有东西押在一个人身上。', '你们没有和好，也没有反目。她给你一份能查验的材料，你给她一个有范围的承诺。这段关系暂时只够合作，不够托付。', { proof: 2, capital: 1 }, 'free', { guContact: true, guardedPact: true })
      ]
    },
    {
      title: '最想你回家的人，最需要你坐牢', place: '第六天 / 沈鸿川的书房', chapter: '你赢得过假少爷，赢得过亲爹吗',
      text: '你在书房看见两份日期相隔二十年的亲子报告。父亲早就知道你是谁，却等到母亲遗产即将解封才认你。你的签名能让他接手旧厂，你的罪名能让你再也插不了手。沈鸿川关上门，说沈屿本来就只是替你养着的一把钥匙。',
      quote: '沈鸿川：「你是我亲儿子，所以你比他更应该懂事。」',
      options: [
        option('叫他一声爸，答应换自己当继承人', '你先坐上去，再决定要不要替母亲讨公道。', '父亲替你整理领口，把股权意向书推过来。你终于拿到了他以前不给的东西，也看见桌下压着另一份等你落笔的责任书。', { capital: 4, heat: 2 }, 'flex', { fatherDeal: true, controlOffer: true }),
        option('让他继续说。要有人听见这番话', '如果外面没人接应，这就只是一场父子翻脸。', '你把对话拖到了自己想问的地方。谁能留下它，要看门外有没有你此前留下的人。', { proof: 2, heat: 2 }, 'plan'),
        option('不争那张椅子，先拿母亲遗嘱原件', '你盯的是让他不得不认的东西。', '父亲以为你只想知道自己是不是被爱过，终于拿出母亲的遗嘱。你记住保管去向，把有效材料留存下来。你们再也演不了普通父子。', { proof: 3, capital: -1, heat: 1 }, 'free', { motherWill: true }),
        option('股份可以不要，先把小满带出沈家', '这句爸爸如果还值钱，你只拿它换一个人。', '你把继承位推回去，只要父亲交出小满。走出大门后，她握住你的手，问你这次是不是终于不回来了。你没有立刻回答。', { allies: 2, capital: -1, heat: -1 }, 'bond', { sisterSafe: true, sisterAtShen: false, escapeLead: true })
      ]
    },
    {
      title: '假少爷跪下来，求你别叫他弟弟', place: '第六夜 / 无人的地下车库', chapter: '原来他也只是一次性用品',
      text: '沈屿在车库等你，膝盖一软就跪了。他收到一份把纵火责任全推给他的材料，才知道你不肯签，父亲就会用他。现在他肯交出指令和录音，条件是你让他活着走进调查室，而不是送回沈家。',
      quote: '沈屿：「别叫我弟弟了。这个家一叫儿子，就有人要坐牢。」',
      options: [
        option('带他回去，换沈家的最后一份股权', '你把他交回棋盘，换自己离王座更近一步。', '父亲如约给出条件，沈屿的手机随后关机。你已经不再是当年的替罪羊，只是这次，被你送回去的是另一个人。', { capital: 4, allies: -2, heat: 2 }, 'flex', { usedBrother: true, controlOffer: true }),
        option('安排独立接应，让他交出完整口供', '你不原谅他，也不允许父亲先让他闭嘴。', '沈屿交出完整材料，按约去接受调查。你没扶他起来，只让他别再喊哥。他终于知道这一次的认罪书不能让别人代签。', { proof: 3, capital: -2, heat: 1 }, 'bond', { brotherStatement: true, brotherProtected: true }),
        option('让他当着小满的面承认做过什么', '你要他先面对被毁掉的人。', '沈屿说完，小满只问了一句：「那你为什么现在才知道害怕？」你等到了这句道歉，却没有因此多出一份足够完整的证据。', { allies: 1, heat: 3 }, 'free', { brotherHumiliated: true }),
        option('让他回去装赢，我们合演最后一场', '你打算连父亲给你的落笔位置，也一起利用。', '沈屿答应在终局前交出指令原件。你让他照常回去，等那份责任书再次摆到自己面前。这是一场需要人接应的赌局。', { proof: 2, capital: 1, heat: 2 }, 'plan', { bait: true, fatherDeal: false })
      ]
    },
    {
      title: '赢他的材料，也会伤到你的人', place: '第七天清晨 / 董事会前', chapter: '你要翻盘，还是要所有人都回来',
      text: '你终于把零散材料拼到一起，却发现完整公开会把顾家当年的隐瞒也掀出来。顾明棠可能失去公司，旧厂交易也会暂停。沈鸿川只差最后一次签字就能脱身。你手里的钱和人，最多撑过今天。',
      quote: '顾明棠：「别替我选。告诉我，你准备付什么代价。」',
      options: [
        option('完整材料交出去，我也承担自己的那一份', '证据不只对敌人有效，自己人也不能抽走一页。', '你把所有材料一并封存递交，自己的交易记录也在里面。顾明棠没有拦你，只把公司印章留在桌上，说她会自己去说明。', { proof: 2, heat: 2 }, 'plan', { publicFile: true }),
        option('先凑足表决权，把父亲赶下去', '今天拿不到沈氏，你怕明天再也没有机会。', '你把最后的钱押给临时股权交易。父亲第一次失去稳坐主位的把握。可如果拿不出母亲的确权材料，今天的热闹随时会被他翻回去。', { capital: -3, heat: 1 }, 'flex', { controlMove: true }),
        option('先把人撤出去，谁也别独自留下', '钱不够就卖自己的东西，这次先准备接应。', '你安排了小满和愿意出面的人的去处，也为顾明棠留了离场方案。桌上的筹码变薄了，但你终于不用一边开口，一边猜背后有没有人消失。', { capital: -3, allies: 2, heat: -2 }, 'bond', { evacuation: true, sisterSafe: true, sisterAtShen: false, guSafe: true }),
        option('放下今天的继承位，把退路兑现', '你愿意少赢一点，但不再把走人只挂在嘴上。', '你把能依法处分的权益换成退路，不够的部分自己补。车和住处都安排好了。今天若翻不了盘，你也不会再上那辆接你回家的车。', { capital: 2, heat: -1 }, 'free', { escapeReady: true })
      ]
    },
    {
      title: '笔又递到手里，你还签不签', place: '第七天 / 最后一场董事会', chapter: '这一回，真少爷自己写结局',
      text: '沈鸿川当众把主位让给你。股权意向书下面，仍压着那份纵火责任书，落笔处与你前世一模一样。他说，只要你签，沈屿认罪，你继承沈家。所有人都站起来等着鼓掌。你知道，这支笔落在哪里，才是最后的结局。',
      quote: '沈鸿川：「七天够你闹了。儿子，该回家了。」',
      options: [
        option('不接笔。把整场会议和材料一起交出去', '你要他失去的不只是董事长的位置。', '你把桌上的文件翻过来，让镜头照见两份截然不同的签字内容。接下来能不能把他彻底钉住，要看你这七天留下了什么。', { proof: 1, heat: 1 }, 'plan', { finale: 'expose' }),
        option('证据留在桌上，我要沈氏真正的控制权', '你决定让他活着看你坐上去。', '你没有立刻公开材料，而是把它们推回父亲面前。你要的是改写沈家的主人，能不能拿住这张椅子，却取决于手里有没有真东西。', { capital: 2, heat: 2 }, 'flex', { finale: 'control' }),
        option('把代罪书撕开，拉住愿意跟我走的人', '让沈家留在这里，你先把人带出这扇门。', '你撕开那页纸，没有等满场人重新坐下。你留过的退路、安排过的接应，以及这些天还愿不愿信你的人，此刻一起给出答案。', { heat: -2, allies: 1 }, 'free', { finale: 'leave' }),
        option('接过笔，照着父亲安排的位置签', '你也许在重演上一世，也许在等一个最后的反转。', '笔尖落下。沈鸿川终于露出今晚第一个真笑。门外如果没有你提前安排的人，这一次，就再也不会有人替你喊停。', { capital: 1, heat: 3 }, 'bond', { finale: 'sign' })
      ]
    }
  ];
  const endings = {
    mastermind: { title: '全家等你认罪，你让他们先交代', role: '破局的真少爷', verdict: '翻盘成功 / 真相线', summary: '母亲的遗嘱和另一条独立证据链对上了。沈鸿川再也没法只把假少爷推出来挡事，旧厂和纵火案一起进入调查。你没有再替任何人签下那份罪名。', cost: '你拿回的不是一个被全家欢迎的位置。沈家彻底撕开，母亲旧事、顾家的隐瞒和你自己的交易都要被重新查清。赢下真相，就不能只公开对自己有利的半本账。', after: '番外里，你站在旧厂门口等第一班工人下班。有人叫你沈少，你说，叫名字就好。', line: '这次认亲，认清的是他们。' },
    ensemble: { title: '你改掉的，不止一个人的死局', role: '有人并肩的男主', verdict: '翻盘成功 / 同盟线', summary: '你把材料留给调查，把人交给提前准备的接应。沈家没能再拆散所有证人，各自掌握的片段终于可以放到同一张桌上。你们走出那扇门，才真正让父亲失去了逐个击破的机会。', cost: '你让出了一部分财产与独自复仇的痛快，也得接受盟友自己作出的决定。婚约、旧厂和原谅，都没办法用赢一次董事会直接结清。', after: '番外里，大家约在一家小店吃饭。顾明棠迟到了，先问你那份一年婚约，后半段还准备怎么谈。', line: '前世只剩你一个，这次没有。' },
    freedom: { title: '沈家没倒，但你再也没回去', role: '走出旧命的男主', verdict: '改命成功 / 离场线', summary: '你没有拿到最响亮的报复，却把小满和自己的退路安排好了。你把已经取得的材料留给能继续处理的人，坐上了自己选的车。沈家的胜负，终于不能再决定你活成什么样。', cost: '你放下了当场证明自己值得被爱的执念，也放下让每个人立刻付出代价的愿望。很多问题仍会慢慢追来，但它们不再把你锁在那栋房子里。', after: '番外里，小满问以后还姓不姓沈。你说姓什么都行，回家这件事，我们自己定。', line: '离开的不是豪门，是上一世。' },
    comeback: { title: '他们把你当筹码，你掀了最后一张牌', role: '绝境翻盘的继承人', verdict: '翻盘成功 / 险胜线', summary: '你把前面攒下的材料和接应压到最后一刻，终于让沈鸿川失去对局面的控制。胜负不是靠你重生这件事决定的，而是那些没有丢掉的底牌，在他最得意的时候一起回来了。', cost: '你走过了太多能再次栽倒的地方，很多信任也只剩最后一点。沈家的权力更替还没结束，你已经知道，拿到签字权和拿稳人生是两回事。', after: '番外里，你换掉书房里那张旧桌子。搬走时，桌下还压着一支没用完的签字笔。', line: '他教你认命，你偏学会了留后手。' },
    tyrant: { title: '你成了沈家的主人，也成了他的样子', role: '黑化的掌局人', verdict: '夺权成功 / 代价失控', summary: '你用材料换来位置，把伤过你的人一个个变成能交换的条件。沈鸿川被赶出了主位，沈氏也终于开始听你的。但你并没有拆掉这套把人当耗材的规则，只是成了新的使用者。', cost: '有些人不会再接你的电话。你等到了所有人改口，却很难再等到一句没有条件的信任。复仇已经完成，那个最想毁掉的父亲却留在了你的做法里。', after: '番外里，助理问那位等在门外的年轻人要不要见。你听见自己说：「先看看他能换什么。」', line: '你赢了他的位置，没走出他的剧本。' },
    bankrupt: { title: '你躲过了假少爷，还是签进了父亲的局', role: '再次被选中的替罪者', verdict: '改命失败 / 家族陷阱', summary: '那份你以为可以换来主位的承诺，没能挡住责任书。你又一次把最后的决定权交给了沈鸿川，而你手里的材料或接应不足以在落笔时叫停他。父亲没有因为你是亲生的，就少算你一步。', cost: '这一世，你比从前更早看穿沈屿，却仍把「终于被父亲选中」误认成安全。重生替你重开了七天，没有替你把签出去的命收回来。', after: '番外里，沈家发布了一张团圆照。主位旁空出一个位置，配文仍写着：一家人，风雨同舟。', line: '最贵的一声儿子，写在责任书上。' },
    ongoing: { title: '这一次没再认罪，但翻盘还差一刀', role: '逃出旧局的追查者', verdict: '保住主动 / 复仇未完', summary: '你没有让前世原样重演，也把沈家的完美说辞撕开了口子。但你留在手里的原件、独立证词或接应，还不足以同时护住人和完成最后的反击。沈鸿川失去了一部分遮掩，却没有当场失去全部。', cost: '你得带着尚未解决的事继续往前。已经说出口的真相会引来反扑，错过的材料也不会因为主角有重生记忆就自己出现。', after: '番外里，你把七天的来往重新排开。最早被自己略过去的那个人，名字又出现在纸上。', line: '未来已经改了，结局还要继续争。' }
  };
  function initial() {
    return { score: { proof: 0, capital: 5, allies: 1, heat: 0, free: 0 }, tags: { plan: 0, flex: 0, bond: 0, free: 0 }, flags: { sisterSafe: false, guTrust: false, driverHelp: false }, history: [] };
  }
  function resolveEpisode(index, ctx) {
    const source = episodes[index];
    if (!source) throw new Error('Invalid episode');
    const e = { ...source, options: source.options.map(o => ({ ...o, delta: { ...o.delta }, effects: { ...o.effects } })) };
    const f = ctx.flags;
    if (index === 1 && f.sisterSafe) e.text = '你把小满安顿好后，顾明棠的车停在巷口。前世她是你认定的敌人，也是最后冒雨追过你车的人。她递来一年婚约：你有母亲留下的继承资格，她有钱和人。明天可以结婚，七天后也可能一起输。';
    if (index === 2) {
      if (f.guTrust) e.options[2] = option('让顾明棠接应阿舟，自己去追回公文包', '一人接住一头，代价是让她也露面。', '阿舟获救，旧账副本也留下了。顾明棠为这次接应动用了自己的人，沈鸿川很快会知道她介入到了哪一步。你做到了两全，也给她添上了风险。', { proof: 3, allies: 1, capital: -2, heat: 2 }, 'bond', { ledger: true, witness: true, driverHelp: true, guExposed: true });
      else e.options[2] = option('报警后留在现场，把黑车去向交给救援人员', '你没有能分头托付的人，只能先守住眼前。', '阿舟被及时送医，你也留下了目击描述。等你回头找包，黑车早没了影。没有盟友的时候，想同时抢下两头，没那么容易。', { proof: 1, allies: 1, heat: -1 }, 'plan', { driverHelp: true });
    }
    if (index === 3 && f.ledger) e.text += '公文包里的旧账记着挂钟的寄存编号，那不是一件普通遗物。';
    if (index === 4) {
      const safe = f.sisterSafe;
      e.text = safe ? '那场本该七号发生的火，四号就烧了起来。好在小满早被你送走，她不在这里。你听见档案室旁还有工人没出来，母亲旧厂的原账也将被火吞掉。你改变了前面的选择，未来便不再照着记忆走。' : '那场本该七号发生的火，四号就烧了起来。沈家把小满叫到旧厂帮你清点遗物，她现在还在三楼。档案室里的原账也将被火吞掉。你第一次发现，前世记忆不能同时帮你保住人和证据。';
      e.options[0] = safe ? option('小满已安顿好，我先守住工人撤离', '你早一步送走妹妹，现在能替别人多争一点时间。', '所有人撤出警戒线，原账在救援清点中被找回了一部分。小满一直在安全的住处。你前面舍掉的那次查账机会，终于在今天换回了余地。', { proof: 2, allies: 2, heat: -1 }, 'bond', { ledger: true, rescuedWorkers: true }) : option('先接住小满，原账丢了再找', '你不愿再用一个人去换母亲留下的东西。', '小满被救援人员带出时，第一句话是问你会不会生她的气。档案室已经不能靠近。你把她送离沈家的范围，手里攥着空空的文件袋。', { allies: 3, heat: -1 }, 'bond', { sisterSafe: true, sisterAtShen: false });
      if (!safe) e.options[1].effects.sisterAtShen = true;
      if (f.guTrust || f.driverHelp) {
        const helper = f.guTrust ? '顾明棠' : '阿舟';
        e.options[2] = option(`把接人的事托给${helper}，自己守住原账`, '前面留下的关系，今天变成一次真正的接应。', `${helper}接到了人，你也留下了账。沈家的人拍到了这次接应，日后威胁不会再只冲你一个人来。这不是凭空多出一条命，是有人替你分担了危险。`, { proof: 3, capital: -2, heat: 2 }, 'plan', { ledger: true, sisterSafe: true, sisterAtShen: false, guExposed: !!f.guTrust });
      } else e.options[2] = option('把楼层告诉救援队，守在出口等人', '你没有能分头托付的人，先让这场火别再吞掉谁。', '救援人员把小满和工人带了出来，你的原账却只剩残页。你把小满带到别处安顿，决定以后不再赌自己能同时跑完两条路。', { proof: 1, allies: 1, heat: -1 }, 'free', { sisterSafe: true, sisterAtShen: false });
    }
    if (index === 5 && f.guExposed) e.text += '她为你安排过的那次接应，已经被沈家盯上。';
    if (index === 6) {
      if (f.sisterSafe) e.options[3] = option('不给他承诺，先让小满带上退路离城', '她已经安全，这回你能从容把下一步也安排好。', '你没用妹妹去换父亲的任何条件。小满拿到车票和下一处住址，只问你什么时候来。父亲第一次没能从你脸上找到那个熟悉的软肋。', { allies: 2, capital: -1, heat: -1 }, 'free', { sisterSafe: true, escapeReady: true });
      if (f.guTrust || f.driverHelp) {
        const helper = f.guTrust ? '顾明棠' : '阿舟';
        e.options[1].reaction = `你拖着对话，让${helper}在另一端留下完整记录。沈鸿川亲口承认，他早就知道你才是遗产受益人，却一直在等能代你处理一切的时机。你终于有了不只出自自己记忆的佐证。`;
        e.options[1].effects.confession = true;
        e.options[1].delta.proof = 3;
      } else e.options[1].reaction = '你故意激他多说了几句，却没人替你留住这段当面对话。你知道父亲在怕什么，也知道单凭自己复述，仍不足以让别人相信全部。';
    }
    if (index === 7 && f.sisterSafe) e.options[2].line = '小满已经离开沈家的控制，你能让她自己决定见不见他。';
    if (index === 8 && !f.guContact) e.text = '你把手里的线索拼到一起，顾明棠也送来她保留的材料。全部公开会牵出顾家当年的隐瞒，旧厂交易也会暂停。她还不是你的盟友，却愿意为自己作证。沈鸿川只差最后一次签字就能脱身，你剩下的钱和人最多撑过今天。';
    if (index === 9) {
      if (f.sisterSafe) e.text += '小满已经不在他的手里，这次他没法再拿她劝你落笔。';
      else e.text += '小满坐在家属席，父亲的助理就站在她身后。';
      if (f.bait) e.options[3].line = '沈屿答应的原件该到场了，但你还得有独立的接应。';
      if (f.evacuation) e.options[2].reaction = '你撕开那页纸，接应的人在门外等着。小满不在沈家手里，愿意开口的人也不再各自落单。你们能把后面的事一起做完。';
      else if (f.escapeReady && f.sisterSafe) e.options[2].reaction = '你撕开代罪书，打给等在外面的司机。小满已经拿着行李上车。父亲还想让你回头，这一次，车是你自己选的。';
      else e.options[2].reaction = '你撕开了纸，却发现离场也需要安排：谁来接人、材料往哪里送、出了沈家还能不能让证人开口。你拒绝了父亲，却还没有准备好把所有人一起带走。';
      if (f.bait && (f.guTrust || f.confession || f.brotherStatement) && ctx.score.proof >= 12) e.options[3].reaction = '笔落下时，沈屿答应交出的指令原件也送到了。你提前留下的独立接应同时把材料递交出去。你签的是沈鸿川写好的假故事，而他亲手递来的两套文件，成了最后一场表演的实物。';
    }
    return e;
  }
  function replay(answers) {
    if (!Array.isArray(answers) || answers.length > episodes.length) throw new Error('Invalid answers');
    const ctx = initial();
    answers.forEach((a, i) => {
      if (!Number.isInteger(a) || a < 0 || a > 3) throw new Error('Invalid answer');
      const e = resolveEpisode(i, ctx), o = e.options[a];
      for (const [key, value] of Object.entries(o.delta)) ctx.score[key] = Math.max(0, ctx.score[key] + value);
      ctx.tags[o.tag]++;
      if (o.tag === 'free') ctx.score.free++;
      Object.assign(ctx.flags, o.effects);
      ctx.history.push({ episode: i + 1, scene: e.title, choice: o.title, reaction: o.reaction, tag: o.tag, delta: o.delta });
    });
    return ctx;
  }
  function scene(index, answers) { return resolveEpisode(index, replay(answers.slice(0, index))); }
  function classify(c) {
    const f = c.flags, s = c.score;
    if (f.finale === 'expose') return f.motherWill && (f.ledger || f.confession || f.brotherStatement) && s.proof >= 10 ? 'mastermind' : 'ongoing';
    if (f.finale === 'control') {
      if (!(f.motherWill || f.factory) || s.proof < 7 || !(f.controlMove || f.controlOffer || s.capital >= 10)) return 'bankrupt';
      return f.guBetrayed || f.usedBrother ? 'tyrant' : 'comeback';
    }
    if (f.finale === 'leave') {
      if (f.evacuation && f.sisterSafe && (f.guTrust || f.driverHelp || f.brotherStatement) && s.proof >= 7) return 'ensemble';
      return f.sisterSafe && f.escapeReady ? 'freedom' : 'ongoing';
    }
    if (f.finale === 'sign') return f.bait && (f.guTrust || f.confession || f.brotherStatement) && s.proof >= 12 ? 'comeback' : 'bankrupt';
    return 'ongoing';
  }
  function calculate(answers) {
    const c = replay(answers), id = classify(c), f = c.flags;
    const result = { id, score: c.score, tags: c.tags, flags: { ...f }, ...endings[id] };
    if (answers.length === episodes.length) {
      const personal = [];
      personal.push(f.sisterSafe ? '小满已被你带离沈家的控制。' : '小满的去留仍是你尚未解决的软肋。');
      if (f.guBetrayed) personal.push('顾明棠记得你把名单交给沈鸿川的那次选择，她没有替你抹掉这件事。');
      else if (f.guTrust) personal.push('顾明棠还记得你们摊开材料对时间线的那个晚上。');
      if (f.driverHelp) personal.push('阿舟记得你在那条盘山路上为他留下的救援与接应。');
      if (id === 'comeback' && f.finale === 'sign') result.summary = '你接笔之前，就已经让沈屿准备指令原件，让独立接应准备好递交。落笔成了最后一次诱敌确认，两套相互矛盾的文件也完整留下。沈鸿川等到了你的签名，却没等到又一个沉默的替罪者。';
      else if (id === 'comeback') result.summary = '母亲的确权材料或已经取得的旧厂控制，配合你积攒的表决筹码，让沈鸿川没能再稳坐主位。你选择把底牌留在谈判桌，夺回了实实在在的决定权。旧案仍待继续处理，但沈氏从今天起不能再只听他一个人说话。';
      if (id === 'ensemble' && (f.pact !== 'marriage' || !f.guTrust || f.guBetrayed)) result.after = '番外里，小满选了一家小店，愿意来的朋友把桌子坐满。你看着门口，第一次不需要再数少了谁。';
      result.personal = personal;
    }
    return result;
  }
  function branch(index, answers) {
    const f = replay(answers.slice(0, index)).flags;
    if (index === 2 && f.pact === 'marriage') return '顾明棠答应过陪你赌一年。现在，是第一次需要她真的入局。';
    if (index === 3 && f.signatureClue) return '书房那份提前拟好的文件，让你开始怀疑：父亲要的究竟是你，还是你的签名。';
    if (index === 4 && f.sisterSafe) return '提前送走小满，已经改变了这一场危机里你必须保住的人。';
    if (index === 4 && f.songAccess) return '宋妍给你的清点日期还是七号。你改变了第一步，他们也提前换了安排。';
    if (index === 6 && f.motherWill) return '你手里已经有母亲的遗嘱材料。他这次说的每句话，都可以和那份遗嘱对照。';
    if (index === 7 && f.fatherDeal) return '你答应过父亲的交易还压在身上。沈屿看着你，像在看下一个他。';
    if (index === 9 && f.bait) return '车库里约好的那场戏，还差最后一笔。';
    return '';
  }
  function highlights(answers) {
    const history = replay(answers).history;
    return [0, 2, 6, 9].filter(i => i < history.length).map(i => history[i]);
  }
  function inventory(answers) {
    const f = replay(answers).flags, items = [];
    if (f.sisterSafe) items.push('小满已送离沈家');
    if (f.guTrust) items.push('顾明棠愿意接应');
    if (f.driverHelp) items.push('阿舟记得你救过他');
    if (f.ledger) items.push('旧账副本或原账在手');
    if (f.motherWill) items.push('母亲遗嘱材料在手');
    if (f.confession) items.push('父亲的自述已留存');
    if (f.brotherStatement) items.push('沈屿的完整口供已留存');
    if (f.bait) items.push('与沈屿约好终局反演');
    if (f.escapeReady) items.push('离场接应已备好');
    return items;
  }
  function validateSave(save) {
    return save && save.version === VERSION && Array.isArray(save.answers) && save.answers.length <= episodes.length && save.answers.every(a => Number.isInteger(a) && a >= 0 && a < 4) && Number.isInteger(save.index) && save.index >= 0 && save.index < episodes.length && ['choice', 'reaction', 'result'].includes(save.phase) && (save.phase === 'result' ? save.answers.length === episodes.length : save.phase === 'reaction' ? save.answers.length > save.index : save.answers.length >= save.index);
  }
  const examples = {
    plan: [1, 2, 2, 1, 2, 2, 1, 1, 0, 0],
    bond: [3, 2, 0, 2, 2, 2, 3, 1, 2, 2],
    free: [3, 3, 3, 1, 0, 3, 3, 2, 3, 2],
    flex: [0, 0, 3, 3, 3, 0, 0, 0, 1, 3],
    comeback: [1, 2, 2, 1, 2, 2, 1, 3, 0, 3],
    dark: [1, 0, 1, 0, 1, 0, 2, 0, 1, 1],
    unfinished: [0, 3, 3, 3, 3, 3, 0, 2, 1, 0]
  };
  const api = { VERSION, episodes, endings, examples, scene, calculate, branch, highlights, inventory, validateSave };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Drama = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
