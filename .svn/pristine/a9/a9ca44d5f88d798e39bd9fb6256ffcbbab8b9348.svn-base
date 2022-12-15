import Mock from 'mockjs2'
import { builder, getBody } from '@/mock/util'
// 模板管理
const templateData = {
    data: [{
        field1: 'itemslistscore_1634631294_1634631401140',
        field2: 'itemsscore_1634631401140',
        field3: 'itemsscore_1634631401141',
        field4: 'itemslistscore_1634631294_1634631401141',
        field5: 'itemslistscore_1634631401140_1634631401142',
        field6: 'itemslistscore_1634631401141_1634631401143',
        field7: 'itemslistscore_1634631401141_1634631401145',
        id: '2',
        inputtime: '2021-10-19 16:34:55',
        inputUser: 'admin',
        pass_score: '18',
        pass_score2: '5',
        pass_type: '>=',
        pass_type2: '>=',
        remarks: '',
        setting: '{"postdata":{"templatename":"400语音质检标准1","itemsname_1634631294":"","itemstype_1634631294":"1","itemsscore_1634631294":"0","itemslistscore_1634631294_1634631401140":"","itemslistremark_1634631294_1634631401140":"","itemstype_1634631401140":"0","itemstype_1634631401141":"0","pass_type":">=","pass_type2":">=","itemslistscore_1634631294_1634631401141":"","itemslistremark_1634631294_1634631401141":"","pass_score":"18","pass_score2":"5","itemslistname_1634631294_1634631401140":"辱骂客户","itemsname_1634631401140":"开场语","itemsscore_1634631401140":"10","itemslistname_1634631401140_1634631401142":"是否准确使用开场语","itemslistscore_1634631401140_1634631401142":"10|5|4|0","itemslistremark_1634631401140_1634631401142":"没有使用开场语直接0分，有使用开场语，但是不规范，不流畅给5分，按照指定标准使用开场语10分","itemsname_1634631401141":"结束语","itemsscore_1634631401141":"20","itemslistname_1634631401141_1634631401143":"是否准确使用结束语","itemslistscore_1634631401141_1634631401143":"10|5|0","itemslistremark_1634631401141_1634631401143":"没有使用直接0分，有使用，但是不规范，不流畅给5分，按照指定标准使用10分","itemslistname_1634631294_1634631401141":"专业知识不足","itemslistname_1634631401141_1634631401145":"结束语是否祝好","itemslistscore_1634631401141_1634631401145":"10|5|0","itemslistremark_1634631401141_1634631401145":"是否祝好巴拉巴拉"},"template_data":{"1634631294":{"type":"1","list":{"1634631401140":{"name":"辱骂客户"},"1634631401141":{"name":"专业知识不足"}}},"1634631401140":{"type":"0","name":"开场语","score":"10","list":{"1634631401142":{"name":"是否准确使用开场语","score":"10|5|4|0","remark":"没有使用开场语直接0分，有使用开场语，但是不规范，不流畅给5分，按照指定标准使用开场语10分"}}},"1634631401141":{"type":"0","name":"结束语","score":"20","list":{"1634631401143":{"name":"是否准确使用结束语","score":"10|5|0","remark":"没有使用直接0分，有使用，但是不规范，不流畅给5分，按照指定标准使用10分"},"1634631401145":{"name":"结束语是否祝好","score":"10|5|0","remark":"是否祝好巴拉巴拉"}}}},"filed_fieldname":{"field1":"itemslistscore_1634631294_1634631401140","field2":"itemsscore_1634631401140","field3":"itemsscore_1634631401141","field4":"itemslistscore_1634631294_1634631401141","field5":"itemslistscore_1634631401140_1634631401142","field6":"itemslistscore_1634631401141_1634631401143","field7":"itemslistscore_1634631401141_1634631401145"}}',
        template_name: '400语音质检标准1',
        total_score: '30'
    }, {
        field1: 'itemslistscore_1633934139_1633935318285',
        field2: 'itemsscore_1633935318285',
        field3: 'itemslistscore_1633934139_1633935318286',
        field4: 'itemslistscore_1633934139_1633935318287',
        field5: 'itemslistscore_1633934139_1633935318288',
        field6: 'itemslistscore_1633934139_1633935318289',
        field7: 'itemslistscore_1633934139_1633935318290',
        field8: 'itemsscore_1633935318286',
        field9: 'itemslistscore_1633935318285_1633935318287',
        field10: 'itemslistscore_1633935318286_1633935318288',
        field11: 'itemslistscore_1633935318285_1633935318289',
        field12: 'itemslistscore_1633935318286_1633935318290',
        id: '1',
        inputtime: '2021-10-11 15:07:30',
        inputUser: '洪晓雯',
        pass_score: '60',
        pass_score2: '15',
        pass_type: '>=',
        pass_type2: '>=',
        remarks: '',
        setting: '{"postdata":{"templatename":"400语音质检标准","itemsname_1633934139":"","itemstype_1633934139":"1","itemsscore_1633934139":"0","itemslistscore_1633934139_1633935318285":"","itemslistremark_1633934139_1633935318285":"","itemstype_1633935318285":"0","pass_type":">=","pass_type2":">=","itemslistscore_1633934139_1633935318286":"","itemslistremark_1633934139_1633935318286":"","itemslistscore_1633934139_1633935318287":"","itemslistremark_1633934139_1633935318287":"","itemslistscore_1633934139_1633935318288":"","itemslistremark_1633934139_1633935318288":"","itemslistscore_1633934139_1633935318289":"","itemslistremark_1633934139_1633935318289":"","itemslistscore_1633934139_1633935318290":"","itemslistremark_1633934139_1633935318290":"","itemstype_1633935318286":"0","pass_score":"60","pass_score2":"15","itemslistname_1633934139_1633935318285":"1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉","itemsname_1633935318285":"服务部分","itemsscore_1633935318285":"50","itemslistname_1633935318285_1633935318287":"语音话术","itemslistscore_1633935318285_1633935318287":"25|20|15|10","itemslistremark_1633935318285_1633935318287":"1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；\\n2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；\\n3、准确理解用户表达需求，积极提供有效的解决方案。","itemslistname_1633934139_1633935318286":"2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉","itemslistname_1633934139_1633935318287":"3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等","itemslistname_1633934139_1633935318288":"4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉","itemslistname_1633934139_1633935318289":"5、沟通中客户明确表示要投诉客服服务态度问题，核实属","itemslistname_1633934139_1633935318290":"6、公司红线","itemsname_1633935318286":"业务部分","itemsscore_1633935318286":"50","itemslistname_1633935318286_1633935318288":"沟通技巧","itemslistscore_1633935318286_1633935318288":"25|20|15|10","itemslistremark_1633935318286_1633935318288":"1、回复问题表述清晰、易懂；\\n2、讲述问题有一定连贯性、逻辑性；\\n3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】\\n4、吐字清晰、音量适中，以客户的感知度为准\\n5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫","itemslistname_1633935318285_1633935318289":"服务态度","itemslistscore_1633935318285_1633935318289":"25|20|15|10","itemslistremark_1633935318285_1633935318289":"1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】\\n2、用户对该接待员工非常满意，点名指名赞扬称赞；\\n3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；","itemslistname_1633935318286_1633935318290":"专业技能","itemslistscore_1633935318286_1633935318290":"25|20|15|10","itemslistremark_1633935318286_1633935318290":"1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；\\n2、灵活运用售后政策较低成本处理售后问题；\\n3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；\\n4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”\\n5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）\\n6、根据公司已宣导的现有流程给予有效的解决方案"},"template_data":{"1633934139":{"type":"1","list":{"1633935318285":{"name":"1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉"},"1633935318286":{"name":"2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉"},"1633935318287":{"name":"3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等"},"1633935318288":{"name":"4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉"},"1633935318289":{"name":"5、沟通中客户明确表示要投诉客服服务态度问题，核实属"},"1633935318290":{"name":"6、公司红线"}}},"1633935318285":{"type":"0","name":"服务部分","score":"50","list":{"1633935318287":{"name":"语音话术","score":"25|20|15|10","remark":"1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；<br\\/>2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；<br\\/>3、准确理解用户表达需求，积极提供有效的解决方案。"},"1633935318289":{"name":"服务态度","score":"25|20|15|10","remark":"1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】<br\\/>2、用户对该接待员工非常满意，点名指名赞扬称赞；<br\\/>3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；"}}},"1633935318286":{"type":"0","name":"业务部分","score":"50","list":{"1633935318288":{"name":"沟通技巧","score":"25|20|15|10","remark":"1、回复问题表述清晰、易懂；<br\\/>2、讲述问题有一定连贯性、逻辑性；<br\\/>3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】<br\\/>4、吐字清晰、音量适中，以客户的感知度为准<br\\/>5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫"},"1633935318290":{"name":"专业技能","score":"25|20|15|10","remark":"1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；<br\\/>2、灵活运用售后政策较低成本处理售后问题；<br\\/>3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；<br\\/>4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”<br\\/>5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）<br\\/>6、根据公司已宣导的现有流程给予有效的解决方案"}}}},"filed_fieldname":{"field1":"itemslistscore_1633934139_1633935318285","field2":"itemsscore_1633935318285","field3":"itemslistscore_1633934139_1633935318286","field4":"itemslistscore_1633934139_1633935318287","field5":"itemslistscore_1633934139_1633935318288","field6":"itemslistscore_1633934139_1633935318289","field7":"itemslistscore_1633934139_1633935318290","field8":"itemsscore_1633935318286","field9":"itemslistscore_1633935318285_1633935318287","field10":"itemslistscore_1633935318286_1633935318288","field11":"itemslistscore_1633935318285_1633935318289","field12":"itemslistscore_1633935318286_1633935318290"}}',
        template_name: '400语音质检标准',
        total_score: '100'
    }, {
        field1: 'itemslistscore_1633934139_1633935318285',
        field2: 'itemsscore_1633935318285',
        field3: 'itemslistscore_1633934139_1633935318286',
        field4: 'itemslistscore_1633934139_1633935318287',
        field5: 'itemslistscore_1633934139_1633935318288',
        field6: 'itemslistscore_1633934139_1633935318289',
        field7: 'itemslistscore_1633934139_1633935318290',
        field8: 'itemsscore_1633935318286',
        field9: 'itemslistscore_1633935318285_1633935318287',
        field10: 'itemslistscore_1633935318286_1633935318288',
        field11: 'itemslistscore_1633935318285_1633935318289',
        field12: 'itemslistscore_1633935318286_1633935318290',
        id: '3',
        inputtime: '2021-10-11 15:07:30',
        inputUser: '李建',
        pass_score: '60',
        pass_score2: '15',
        pass_type: '>=',
        pass_type2: '>=',
        remarks: '',
        setting: '{"postdata":{"templatename":"400在线客服标准","itemsname_1633934139":"","itemstype_1633934139":"1","itemsscore_1633934139":"0","itemslistscore_1633934139_1633935318285":"","itemslistremark_1633934139_1633935318285":"","itemstype_1633935318285":"0","pass_type":">=","pass_type2":">=","itemslistscore_1633934139_1633935318286":"","itemslistremark_1633934139_1633935318286":"","itemslistscore_1633934139_1633935318287":"","itemslistremark_1633934139_1633935318287":"","itemslistscore_1633934139_1633935318288":"","itemslistremark_1633934139_1633935318288":"","itemslistscore_1633934139_1633935318289":"","itemslistremark_1633934139_1633935318289":"","itemslistscore_1633934139_1633935318290":"","itemslistremark_1633934139_1633935318290":"","itemstype_1633935318286":"0","pass_score":"60","pass_score2":"15","itemslistname_1633934139_1633935318285":"1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉","itemsname_1633935318285":"服务部分","itemsscore_1633935318285":"50","itemslistname_1633935318285_1633935318287":"语音话术","itemslistscore_1633935318285_1633935318287":"25|20|15|10","itemslistremark_1633935318285_1633935318287":"1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；\\n2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；\\n3、准确理解用户表达需求，积极提供有效的解决方案。","itemslistname_1633934139_1633935318286":"2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉","itemslistname_1633934139_1633935318287":"3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等","itemslistname_1633934139_1633935318288":"4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉","itemslistname_1633934139_1633935318289":"5、沟通中客户明确表示要投诉客服服务态度问题，核实属","itemslistname_1633934139_1633935318290":"6、公司红线","itemsname_1633935318286":"业务部分","itemsscore_1633935318286":"50","itemslistname_1633935318286_1633935318288":"沟通技巧","itemslistscore_1633935318286_1633935318288":"25|20|15|10","itemslistremark_1633935318286_1633935318288":"1、回复问题表述清晰、易懂；\\n2、讲述问题有一定连贯性、逻辑性；\\n3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】\\n4、吐字清晰、音量适中，以客户的感知度为准\\n5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫","itemslistname_1633935318285_1633935318289":"服务态度","itemslistscore_1633935318285_1633935318289":"25|20|15|10","itemslistremark_1633935318285_1633935318289":"1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】\\n2、用户对该接待员工非常满意，点名指名赞扬称赞；\\n3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；","itemslistname_1633935318286_1633935318290":"专业技能","itemslistscore_1633935318286_1633935318290":"25|20|15|10","itemslistremark_1633935318286_1633935318290":"1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；\\n2、灵活运用售后政策较低成本处理售后问题；\\n3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；\\n4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”\\n5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）\\n6、根据公司已宣导的现有流程给予有效的解决方案"},"template_data":{"1633934139":{"type":"1","list":{"1633935318285":{"name":"1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉"},"1633935318286":{"name":"2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉"},"1633935318287":{"name":"3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等"},"1633935318288":{"name":"4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉"},"1633935318289":{"name":"5、沟通中客户明确表示要投诉客服服务态度问题，核实属"},"1633935318290":{"name":"6、公司红线"}}},"1633935318285":{"type":"0","name":"服务部分","score":"50","list":{"1633935318287":{"name":"语音话术","score":"25|20|15|10","remark":"1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；<br\\/>2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；<br\\/>3、准确理解用户表达需求，积极提供有效的解决方案。"},"1633935318289":{"name":"服务态度","score":"25|20|15|10","remark":"1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】<br\\/>2、用户对该接待员工非常满意，点名指名赞扬称赞；<br\\/>3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；"}}},"1633935318286":{"type":"0","name":"业务部分","score":"50","list":{"1633935318288":{"name":"沟通技巧","score":"25|20|15|10","remark":"1、回复问题表述清晰、易懂；<br\\/>2、讲述问题有一定连贯性、逻辑性；<br\\/>3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】<br\\/>4、吐字清晰、音量适中，以客户的感知度为准<br\\/>5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫"},"1633935318290":{"name":"专业技能","score":"25|20|15|10","remark":"1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；<br\\/>2、灵活运用售后政策较低成本处理售后问题；<br\\/>3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；<br\\/>4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”<br\\/>5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）<br\\/>6、根据公司已宣导的现有流程给予有效的解决方案"}}}},"filed_fieldname":{"field1":"itemslistscore_1633934139_1633935318285","field2":"itemsscore_1633935318285","field3":"itemslistscore_1633934139_1633935318286","field4":"itemslistscore_1633934139_1633935318287","field5":"itemslistscore_1633934139_1633935318288","field6":"itemslistscore_1633934139_1633935318289","field7":"itemslistscore_1633934139_1633935318290","field8":"itemsscore_1633935318286","field9":"itemslistscore_1633935318285_1633935318287","field10":"itemslistscore_1633935318286_1633935318288","field11":"itemslistscore_1633935318285_1633935318289","field12":"itemslistscore_1633935318286_1633935318290"}}',
        template_name: '400在线客服标准',
        total_score: '100'
    }
    ],
    pageNo: 1,
    where: '1=1 '
}
templateData.data.forEach(item => {
    for (let i = 1; i < 91; i++) {
        if (!item[`field${i}`]) {
            item[`field${i}`] = ''
        }
    }
})
const templateUserData = [{
    display: 'admin(管理员)',
    value: 'admin'
}, {
    display: '洪晓雯(洪晓雯)',
    value: '洪晓雯'
}, {
    display: 'cwq(cwq)',
    value: 'cwq'
}, {
    display: '何倩文(何倩文)',
    value: '何倩文'
}, {
    display: '梁志坚(梁志坚)',
    value: '梁志坚'
}, {
    display: '400客服(中立生物)',
    value: '400客服'
}]
const templateInit = (options) => {
    const parameters = getBody(options)
    let data = templateData.data
    if (parameters.inputUser) {
        data = data.filter(item => item.inputUser === parameters.inputUser)
    }
    if (parameters.template_name) {
        data = data.filter(item => item.template_name.search(parameters.template_name) > -1)
    }
    return builder({
        pageNo: templateData.pageNo,
        totalCount: data.length,
        data: data
    })
}
const templateUser = (options) => {
    return builder({
        data: templateUserData
    })
}

// 任务管理
const taskData = {
    data: [{
        agentlist: {
            1636938915_54195: {
                agent: '曹兰,陈景辉,洪晓雯',
                rate: '1'
            }
        },
        calltype: '2',
        count: '1',
        distribution_mode: '0',
        extenlist: '姚艳萍a,王明先,杨雯,李兰梅,周桃花,查文娟,洪楚焰,陈祥敏,曹兰,何倩文',
        extra_all: '0',
        finish_rate: '0.00%',
        finished_number: '0',
        id: '27',
        inputTime: '2021-11-15 09:21:56',
        inputUser: '洪晓雯',
        invalid_number: '0',
        max_billsec: '300',
        min_billsec: '1',
        remark: '',
        sum_number: '3',
        taskname: '11.15',
        templateid: '1',
        unfinish_number: '3',
        unsatisfied_only: '0',
        valid_number: '3',
        task_type: '录音质检'

    }, {
        agentlist: {
            1636769522_29102: {
                agent: '洪晓雯',
                rate: '1'
            }
        },
        calltype: '2',
        count: '60',
        distribution_mode: '1',
        extenlist: '400客服,姚艳萍a,杨雯,王明先,查文娟,黄子豪,陈祥敏,洪楚焰,何倩文,曹兰',
        extra_all: '1',
        finish_rate: '1.04%',
        finished_number: '0',
        id: '26',
        inputTime: '2021-11-13 10:11:43',
        inputUser: '洪晓雯',
        invalid_number: '0',
        max_billsec: '400',
        min_billsec: '200',
        remark: '',
        sum_number: '2',
        taskname: '11.13',
        templateid: '1',
        unfinish_number: '2',
        unsatisfied_only: '0',
        valid_number: '2',
        task_type: '录音质检'

    }, {
        agentlist: {
            1635381365_86597: {
                agent: '梁志坚',
                rate: '1'
            }
        },
        calltype: '2',
        count: '1',
        distribution_mode: '0',
        extenlist: '陈祥敏,姚艳萍a',
        extra_all: '0',
        finish_rate: '0.74%',
        finished_number: '0',
        id: '25',
        inputTime: '2021-10-28 08:38:19',
        inputUser: '梁志坚',
        invalid_number: '0',
        max_billsec: '300',
        min_billsec: '1',
        remark: '',
        sum_number: '1',
        taskname: '多人多检全部分配-2021.10.28',
        templateid: '1',
        unfinish_number: '1',
        unsatisfied_only: '0',
        valid_number: '1',
        task_type: '录音质检'

    }, {
        agentlist: {
            1634632499_32555: {
                agent: 'cwq,admin',
                rate: '1'
            }
        },
        calltype: '2',
        count: '20',
        distribution_mode: '0',
        extenlist: '400客服',
        extra_all: '1',
        finish_rate: '25.00%',
        finished_number: '0',
        id: '24',
        inputTime: '2021-10-19 16:38:26',
        inputUser: 'admin',
        invalid_number: '2',
        max_billsec: '300',
        min_billsec: '1',
        remark: '',
        sum_number: '2',
        taskname: '梓菲-20211019',
        templateid: '2',
        unfinish_number: '2',
        unsatisfied_only: '0',
        valid_number: '2',
        task_type: '录音质检'

    }, {
        agentlist: {
            1634632499_32555: {
                agent: 'cwq,admin',
                rate: '1'
            }
        },
        calltype: '2',
        count: '20',
        distribution_mode: '0',
        extenlist: '400客服',
        extra_all: '1',
        finish_rate: '25.00%',
        finished_number: '0',
        id: '23',
        inputTime: '2021-10-19 16:38:26',
        inputUser: 'admin',
        invalid_number: '2',
        max_billsec: '300',
        min_billsec: '1',
        remark: '',
        sum_number: '2',
        taskname: '在线客服质检1',
        templateid: '3',
        unfinish_number: '2',
        unsatisfied_only: '0',
        valid_number: '2',
        task_type: '在线客服质检',
        summary: '1',
        ban: '0',
        sensitive: '0'
    }
    ],
    pageNo: 1,
    where: '1=1 '
}

const taskInit = (options) => {
    let data = taskData.data
    const parameters = getBody(options)
    if (parameters.taskname) {
        data = data.filter(itemData => itemData['taskname'].search(parameters['taskname']) > -1)
    }
    return builder({
        pageNo: taskData.pageNo,
        totalCount: data.length,
        data: data
    })
}

const taskTemplateData = [{
    display: '400语音质检标准1',
    value: '2'
}, {
    display: '400语音质检标准',
    value: '1'
},
{
    display: '400在线客服标准',
    value: '3'
}
]
const taskTemplate = (options) => {
    return builder({
        data: taskTemplateData
    })
}

const taskProcessData = {
    '27': {
        data: [{
            finish_rate: '0.00%',
            finished_number: '0',
            invalid_number: '0',
            quality_agent: '曹兰',
            sum_number: '86',
            taskid: '27',
            unfinish_number: '86',
            valid_number: '86'
        }, {
            finish_rate: '0.00%',
            finished_number: '0',
            invalid_number: '0',
            quality_agent: '洪晓雯',
            sum_number: '84',
            taskid: '27',
            unfinish_number: '84',
            valid_number: '84'
        }, {
            finish_rate: '0.00%',
            finished_number: '0',
            invalid_number: '0',
            quality_agent: '陈景辉',
            sum_number: '86',
            taskid: '27',
            unfinish_number: '86',
            valid_number: '86'
        }]
    },
    '26': {
        data: [{
            finish_rate: '1.04%',
            finished_number: '13',
            invalid_number: '0',
            quality_agent: '洪晓雯',
            sum_number: '1255',
            taskid: '26',
            unfinish_number: '1242',
            valid_number: '1255'
        }]
    },
    '25': {
        data: [{
            finish_rate: '0.74%',
            finished_number: '2',
            invalid_number: '0',
            quality_agent: '梁志坚',
            sum_number: '272',
            taskid: '25',
            unfinish_number: '270',
            valid_number: '272'
        }]
    },
    '24': {
        data: [{
            finish_rate: '50.00%',
            finished_number: '5',
            invalid_number: '2',
            quality_agent: 'admin',
            sum_number: '10',
            taskid: '24',
            unfinish_number: '5',
            valid_number: '8'
        }, {
            finish_rate: '0.00%',
            finished_number: '0',
            invalid_number: '0',
            quality_agent: 'cwq',
            sum_number: '10',
            taskid: '24',
            unfinish_number: '10',
            valid_number: '10'
        }]
    },
    pageNo: 1
}

const taskProcess = (options) => {
    const parameters = getBody(options)
    const data = taskProcessData[parameters.taskid].data
    return builder({
        pageNo: taskProcessData.pageNo,
        totalCount: data.length,
        data: data
    })
}

const taskDetailData = {
    '27': {
        data: [{
            agent: '洪楚焰(洪楚焰)',
            billsec: '38',
            calldate: '2021-11-14 21:02:26',
            calltype: '2',
            cdrid: '595280',
            distribute_agent: '洪晓雯(洪晓雯)',
            distribute_time: '2021-11-15 09:22:05',
            dst: '15811599320',
            hangup: 'Caller',
            order_alias: '',
            quality_agent: '洪晓雯(洪晓雯)',
            quality_agent_setting: '',
            quality_agent_untreated: '洪晓雯',
            quality_time: '0000-00-00 00:00:00',
            recordingfile: '20211114-210226-6011-15811599320-1636894946.128283.wav',
            remark: '',
            remarks: '',
            result: '0',
            ringtime: '10',
            src: '6011',
            status: '未质检',
            taskid: '27',
            templateid: '1',
            total_score: '0',
            typical_case: '0'
        }],
        totalCount: 3
    },
    '26': {
        data: [{
            agent: '黄子豪(黄子豪)',
            billsec: '0',
            calldate: '2021-11-12 16:26:56',
            calltype: '2',
            cdrid: '592456',
            distribute_agent: '洪晓雯(洪晓雯)',
            distribute_time: '2021-11-13 10:13:41',
            dst: '013482765756',
            hangup: 'Callee',
            order_alias: '',
            quality_agent: '洪晓雯(洪晓雯)',
            quality_agent_setting: '',
            quality_agent_untreated: '洪晓雯',
            quality_time: '0000-00-00 00:00:00',
            recordingfile: '20211112-162656-6017-013482765756-1636705616.123199.wav',
            remark: '',
            remarks: '',
            result: '0',
            ringtime: '77',
            src: '6017',
            status: '未质检',
            taskid: '26',
            templateid: '1',
            total_score: '0',
            typical_case: '0'
        }],
        totalCount: 2
    },
    '25': {
        data: [{
            agent: '陈祥敏(陈祥敏)',
            billsec: '62',
            calldate: '2021-10-27 17:57:09',
            calltype: '2',
            cdrid: '569310',
            distribute_agent: '梁志坚(梁志坚)',
            distribute_time: '2021-10-28 08:38:38',
            dst: '6028',
            hangup: 'Callee',
            order_alias: '',
            quality_agent: '梁志坚(梁志坚)',
            quality_agent_setting: '{"\\u6881\\u5fd7\\u575a":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":"20","field10":"25","field11":"25","field12":"25","remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\u6d4b\\u8bd5q\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"95","quality_time":"2021-10-28 08:39:21","remark":"","typical_case":"0","status":1,"result":1,"quality_agent_untreated":""}}',
            quality_agent_untreated: '',
            quality_time: '2021-10-28 08:39:21',
            recordingfile: '20211027-175709-6028-0085252241532-1635328629.80941.wav',
            remark: '',
            remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"测试q","field10":"","field11":"","field12":""}',
            result: '1',
            ringtime: '1',
            src: '0085252241532',
            status: '已质检',
            taskid: '25',
            templateid: '1',
            total_score: '95',
            typical_case: '0'
        }],
        totalCount: 1
    },
    '24': {
        data: [{
            agent: '400客服(中立生物)',
            billsec: '12',
            calldate: '2021-10-19 15:27:38',
            calltype: '2',
            cdrid: '558235',
            distribute_agent: 'admin(管理员)',
            distribute_time: '2021-10-19 16:39:10',
            dst: '6029',
            hangup: 'Callee',
            order_alias: '',
            quality_agent: 'admin(管理员)',
            quality_agent_setting: '{"admin":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\"}","total_score":"25","quality_time":"2021-10-19 16:42:19","remark":"\\u8001\\u5e08\\u7ed9\\u7684\\u603b\\u7ed3","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
            quality_agent_untreated: '',
            quality_time: '2021-10-19 16:42:19',
            recordingfile: '20211019-152738-6029-13524778433-1634628458.60800.wav',
            remark: '老师给的总结',
            remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":""}',
            result: '2',
            ringtime: '4',
            src: '13524778433',
            status: '已质检',
            taskid: '24',
            templateid: '2',
            total_score: '25',
            typical_case: '0'
        }],
        totalCount: 2
    },
    '23': {
        data: [{
            agent_name: '400客服(中立生物)',
            visitor_num: '11234567564',
            calldate: '2021-10-19 15:27:38',
            talking_last: '2000',
            total_msg_num: '52',
            visitor_msg_num: '31',
            agent_msg_num: '21',
            Interaction_times: '331',
            end_reason: 'question done',
            visitor_name: '王富聚',
            quality_agent: 'admin(管理员)',
            quality_agent_setting: '{"admin":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\"}","total_score":"25","quality_time":"2021-10-19 16:42:19","remark":"\\u8001\\u5e08\\u7ed9\\u7684\\u603b\\u7ed3","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
            visitor_id: 332,
            start_time: '2021-10-19 16:42:19',
            recordingfile: '20211019-152738-6029-13524778433-1634628458.60800.wav',
            remark: '老师给的总结',
            remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":""}',
            result: '2',
            ringtime: '4',
            src: '13524778433',
            status: '已质检',
            taskid: '23',
            templateid: '2',
            total_score: '25',
            typical_case: '0'
        }],
        totalCount: 3
    }
}

const taskDetail = (options) => {
    const parameters = getBody(options)
    const detail = taskDetailData[parameters.taskid]
    const data = []
    let index = 1001
    const dst = [detail.data[0].dst, '13917120535', '15121049706']
    const billsec = [detail.data[0].billsec, '28', '25']
    for (let i = 0; i < detail.totalCount; i++) {
        const obj = { ...detail.data[0] }
        for (let j = 1; j < 91; j++) {
            obj[`field${j}`] = ''
        }
        obj.id = index
        index++
        obj.dst = dst[i]
        obj.billsec = billsec[i]
        data.push(obj)
    }
    return builder({
        pageNo: 1,
        totalCount: detail.totalCount,
        data: data
    })
}

// 待质检任务
const testData = {
    data: [{
        agentlist: '{"1634632499_32555":{"agent":"cwq,admin","rate":"1"}}',
        calltype: '2',
        count: '20',
        distribution_mode: '0',
        extenlist: '400客服',
        extra_all: '1',
        finish_rate: '0.00%',
        finished_number: '0',
        id: '24',
        inputTime: '2021-10-19 16:38:26',
        inputUser: 'admin',
        invalid_number: '0',
        max_billsec: '300',
        min_billsec: '1',
        quality_agent: 'cwq',
        remark: '',
        sum_number: '3',
        taskname: '梓菲-20211019',
        templateid: '2',
        unfinish_number: '3',
        unsatisfied_only: '0',
        valid_number: '3',
        task_type: '录音质检'
    }, {
        agentlist: '{"1634627378_45536":{"agent":"cwq,admin","rate":"1"}}',
        calltype: '0',
        count: '20',
        distribution_mode: '0',
        extenlist: '王明先',
        extra_all: '1',
        finish_rate: '0.00%',
        finished_number: '0',
        id: '23',
        inputTime: '2021-10-19 15:35:48',
        inputUser: 'admin',
        invalid_number: '0',
        max_billsec: '300',
        min_billsec: '1',
        quality_agent: 'cwq',
        remark: '测试',
        sum_number: '2',
        taskname: 'zyy-20211019',
        templateid: '2',
        unfinish_number: '2',
        unsatisfied_only: '0',
        valid_number: '2',
        task_type: '录音质检'
    }, {
        agentlist: '{"1634300936_30925":{"agent":"梁志坚,cwq","rate":"1"}}',
        calltype: '2',
        count: '1',
        distribution_mode: '1',
        extenlist: '何倩文,姚艳萍a',
        extra_all: '0',
        finish_rate: '0.00%',
        finished_number: '0',
        id: '21',
        inputTime: '2021-10-15 20:29:40',
        inputUser: 'cwq',
        invalid_number: '0',
        max_billsec: '600',
        min_billsec: '1',
        quality_agent: '梁志坚,cwq',
        remark: '',
        sum_number: '3',
        taskname: '多人多检全部分配',
        templateid: '1',
        unfinish_number: '3',
        unsatisfied_only: '0',
        valid_number: '3',
        task_type: '录音质检'
    }, {
        agentlist: '{"1634300936_30925":{"agent":"梁志坚,cwq","rate":"1"}}',
        calltype: '2',
        count: '1',
        distribution_mode: '1',
        extenlist: '何倩文,姚艳萍a',
        extra_all: '0',
        finish_rate: '0.00%',
        finished_number: '0',
        id: '22',
        inputTime: '2021-10-15 20:29:40',
        inputUser: 'cwq',
        invalid_number: '0',
        max_billsec: '600',
        min_billsec: '1',
        quality_agent: '陈金龙,王明先',
        remark: '',
        sum_number: '2',
        taskname: '在线客服质检1',
        templateid: '1',
        unfinish_number: '3',
        unsatisfied_only: '0',
        summary: '1',
        ban: '0',
        valid_number: '3',
        task_type: '在线客服质检'
    }
    ],
    pageNo: 1
}

const testInit = (options) => {
    const parameters = getBody(options)
    let data = testData.data
    if (parameters.taskname) {
        data = data.filter(itemData => itemData['taskname'].search(parameters['taskname']) > -1)
    }
    return builder({
        pageNo: testData.pageNo,
        totalCount: data.length,
        data: data
    })
}

const testDetailData = {
    '24': {
        data: [{
            agent: '400客服(中立生物)',
            billsec: '94',
            calldate: '2021-10-19 10:53:32',
            calltype: '2',
            cdrid: '557725',
            distribute_agent: 'admin(管理员)',
            distribute_time: '2021-10-19 16:39:10',
            dst: '6029(中立生物)',
            hangup: 'Callee',
            id: '1776',
            order_alias: '',
            quality_agent: 'cwq(cwq)',
            quality_agent_setting: '',
            quality_agent_untreated: 'cwq',
            quality_time: '0000-00-00 00:00:00',
            quality_template: {},
            recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211019-105332-6029-13706757395-1634612012.59866.wav',
            remark: '',
            remarks: '',
            result: '0',
            ringtime: '2',
            src: '13706757395',
            status: '未质检',
            taskid: '24',
            templateid: '2',
            total_score: '0',
            typical_case: '0'
        }],
        totalCount: 3
    },
    '23': {
        data: [{
            agent: '王明先(王明先)',
            billsec: '30',
            calldate: '2021-10-19 09:35:24',
            calltype: '0',
            cdrid: '557480',
            distribute_agent: 'admin(管理员)',
            distribute_time: '2021-10-19 15:36:10',
            dst: '6012(王明先)',
            hangup: 'Callee',
            id: '1756',
            order_alias: '',
            quality_agent: 'cwq(cwq)',
            quality_agent_setting: '',
            quality_agent_untreated: 'cwq',
            quality_template: {},
            quality_time: '0000-00-00 00:00:00',
            recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211019-093524-6012-15296616169-1634607324.59409.wav',
            remark: '',
            remarks: '',
            result: '0',
            ringtime: '2',
            src: '15296616169',
            status: '未质检',
            taskid: '23',
            templateid: '2',
            total_score: '0',
            typical_case: '0'
        }],
        totalCount: 2
    },
    '21': {
        data: [{
            agent: '何倩文(何倩文)',
            billsec: '73',
            calldate: '2021-10-06 18:05:33',
            calltype: '2',
            cdrid: '540418',
            distribute_agent: 'cwq(cwq)',
            distribute_time: '2021-10-15 20:29:49',
            dst: '15957110259',
            hangup: 'Callee',
            id: '1615',
            order_alias: '',
            quality_agent: '梁志坚,cwq',
            quality_agent_setting: '',
            quality_agent_untreated: '梁志坚,cwq',
            quality_template: {},
            quality_time: '0000-00-00 00:00:00',
            recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211006-180534-6001-15957110259-1633514733.28270.wav',
            remark: '',
            remarks: '',
            result: '100',
            ringtime: '21',
            src: '6001(何倩文)',
            status: '未质检',
            taskid: '21',
            templateid: '1',
            total_score: '0',
            typical_case: '0'
        }],
        totalCount: 3
    },
    '22': {
        data: [{
            agent_name: '400客服(中立生物)',
            visitor_num: '11234567564',
            calldate: '2021-10-19 15:27:38',
            talking_last: '2000',
            total_msg_num: '52',
            visitor_msg_num: '31',
            agent_msg_num: '21',
            Interaction_times: '331',
            end_reason: 'question done',
            visitor_name: '王富聚',
            quality_agent: 'admin(管理员)',
            quality_agent_setting: '{"admin":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\"}","total_score":"25","quality_time":"2021-10-19 16:42:19","remark":"\\u8001\\u5e08\\u7ed9\\u7684\\u603b\\u7ed3","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
            visitor_id: 332,
            start_time: '2021-10-19 16:42:19',
            recordingfile: '20211019-152738-6029-13524778433-1634628458.60800.wav',
            remark: '老师给的总结',
            remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":""}',
            result: '2',
            ringtime: '4',
            src: '13524778433',
            status: '未质检',
            taskid: '22',
            id: '1222',
            templateid: '2',
            total_score: '25',
            typical_case: '0'
        }],
        totalCount: 3
    }
}

const testDetail = (options) => {
    const parameters = getBody(options)
    const detail = testDetailData[parameters.id]
    let data = []
    const dst = [detail.data[0].dst, '13348494887', '18075177769']
    const index = parseInt(detail.data[0].id)
    const billsec = [detail.data[0].billsec, '79', '192']
    for (let i = 0; i < detail.totalCount; i++) {
        const obj = { ...detail.data[0] }
        obj.quality_template = {
            filed_fieldname: {
                field1: 'itemslistscore_1634631294_1634631401140',
                field2: 'itemsscore_1634631401140',
                field3: 'itemsscore_1634631401141',
                field4: 'itemslistscore_1634631294_1634631401141',
                field5: 'itemslistscore_1634631401140_1634631401142',
                field6: 'itemslistscore_1634631401141_1634631401143',
                field7: 'itemslistscore_1634631401141_1634631401145'
            },
            postdata: {
                itemslistname_1634631294_1634631401140: '辱骂客户',
                itemslistname_1634631294_1634631401141: '专业知识不足',
                itemslistname_1634631401140_1634631401142: '是否准确使用开场语',
                itemslistname_1634631401141_1634631401143: '是否准确使用结束语',
                itemslistname_1634631401141_1634631401145: '结束语是否祝好',
                itemslistremark_1634631294_1634631401140: '',
                itemslistremark_1634631294_1634631401141: '',
                itemslistremark_1634631401140_1634631401142: '没有使用开场语直接0分，有使用开场语，但是不规范，不流畅给5分，按照指定标准使用开场语10分',
                itemslistremark_1634631401141_1634631401143: '没有使用直接0分，有使用，但是不规范，不流畅给5分，按照指定标准使用10分',
                itemslistremark_1634631401141_1634631401145: '是否祝好巴拉巴拉',
                itemslistscore_1634631294_1634631401140: '',
                itemslistscore_1634631294_1634631401141: '',
                itemslistscore_1634631401140_1634631401142: '10|5|4|0',
                itemslistscore_1634631401141_1634631401143: '10|5|0',
                itemslistscore_1634631401141_1634631401145: '10|5|0',
                itemsname_1634631294: '',
                itemsname_1634631401140: '开场语',
                itemsname_1634631401141: '结束语',
                itemsscore_1634631294: '0',
                itemsscore_1634631401140: '10',
                itemsscore_1634631401141: '20',
                itemstype_1634631294: '1',
                itemstype_1634631401140: '0',
                itemstype_1634631401141: '0',
                pass_score: '18',
                pass_score2: '5',
                pass_type: '>=',
                pass_type2: '>=',
                templatename: '400语音质检标准1'
            },
            template_data: {
                1634631294: {
                    list: { 1634631401140: { name: '辱骂客户' }, 1634631401141: { name: '专业知识不足' } },
                    type: '1'
                },
                1634631401140: {
                    list: {
                        1634631401142: {
                            name: '是否准确使用开场语',
                            remark: '没有使用开场语直接0分，有使用开场语，但是不规范，不流畅给5分，按照指定标准使用开场语10分',
                            score: '10|5|4|0'
                        }
                    },
                    name: '开场语',
                    score: '10',
                    type: '0'
                },
                1634631401141: {
                    list: {
                        1634631401143: {
                            name: '是否准确使用结束语',
                            remark: '没有使用直接0分，有使用，但是不规范，不流畅给5分，按照指定标准使用10分',
                            score: '10|5|0'
                        },
                        1634631401145: {
                            name: '结束语是否祝好',
                            remark: '是否祝好巴拉巴拉',
                            score: '10|5|0'
                        }
                    },
                    name: '结束语',
                    score: '20',
                    type: '0'
                }
            }
        }
        for (let j = 1; j < 91; j++) {
            obj[`field${j}`] = ''
        }
        obj.id = index - i
        obj.dst = dst[i]

        obj.billsec = billsec[i]
        data.push(obj)
    }

    const arr = ['quality_agent', 'agent', 'src', 'dst']

    arr.forEach(item => {
        if (parameters[item]) {
            data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
        }
    })

    if (parameters.begin_time && parameters.endTime) {
        const startDate = new Date(parameters.begin_time).getTime()
        const endDate = new Date(parameters.endTime).getTime()
        data = data.filter(itemData => new Date(itemData.quality_time).getTime() < endDate && new Date(itemData.quality_time).getTime() > startDate)
    }

    return builder({
        pageNo: 1,
        totalCount: detail.totalCount,
        data: data
    })
}

// 已质检录音
const inspectedData = {
    data: [{
        agent: '何倩文(何倩文)',
        billsec: '79',
        calldate: '2021-10-05 17:36:15',
        calltype: '2',
        cdrid: '539180',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '18084339941',
        hangup: 'Caller',
        id: '1236',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-15 20:30:26","remark":"1","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2021-10-15 20:30:26',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173616-6001-18084339941-1633426575.26025.wav',
        remark: '1',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '1',
        ringtime: '11',
        src: '6001(何倩文)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '100',
        typical_case: '0',
        before_reconside: '50',
        reconside_status: '已复议',
        reconside_reason: ''
    }, {
        agent: '何倩文(何倩文)',
        billsec: '22',
        calldate: '2021-10-05 17:35:57',
        calltype: '2',
        cdrid: '539174',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '13692009653',
        hangup: 'Caller',
        id: '1235',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-18 21:23:13","remark":"1235","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2021-10-18 21:23:13',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173558-6001-13692009653-1633426557.26023.wav',
        remark: '1235',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '1',
        ringtime: '16',
        src: '6001(何倩文)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '100',
        typical_case: '0',
        before_reconside: '0',
        reconside_status: '未复议',
        reconside_reason: ''
    }],
    pageNo: 1
}
const awfulRecordData = {
    data: [{
        agent: '王宝强(王宝强)',
        billsec: '79',
        calldate: '2021-10-05 17:36:15',
        calltype: '2',
        cdrid: '539180',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '18084339941',
        hangup: 'Caller',
        id: '1238',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-15 20:30:26","remark":"1","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2021-10-15 20:30:26',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173616-6001-18084339941-1633426575.26025.wav',
        remark: '确认无误',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '0',
        ringtime: '11',
        src: '9527(王宝强)',
        status: '0',
        taskid: '20',
        templateid: '1',
        total_score: '0',
        typical_case: '0',
        invalid_phone: '',
        before_reconside: '0',
        reconside_status: '未复议',
        reconside_reason: '与客户意见不一,被恶意举报',
        reason: '确认无误'
    }, {
        agent: '包贝尔(包贝尔)',
        billsec: '3',
        calldate: '2021-10-05 17:35:57',
        calltype: '2',
        cdrid: '539174',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '13692009653',
        hangup: 'Caller',
        id: '1237',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-18 21:23:13","remark":"1235","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2021-10-18 21:23:13',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173558-6001-13692009653-1633426557.26023.wav',
        remark: '确认无误',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '2',
        ringtime: '16',
        src: '9528(包贝儿)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '0',
        typical_case: '0',
        invalid_phone: '',
        before_reconside: '0',
        reconside_status: '已复议',
        reconside_reason: '客户恶意报复行为',
        reason: '待核实'
    }],
    pageNo: 1
}
const reviewReconsideData = {
    data: [{
        agent: '王宝强(王宝强)',
        billsec: '79',
        calldate: '2021-10-05 17:36:15',
        calltype: '2',
        cdrid: '539180',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '18084339941',
        hangup: 'Caller',
        id: '1238',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-15 20:30:26","remark":"1","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2021-10-15 20:30:26',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173616-6001-18084339941-1633426575.26025.wav',
        remark: '1',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '0',
        ringtime: '11',
        src: '9527(王宝强)',
        status: '0',
        taskid: '20',
        templateid: '1',
        total_score: '0',
        typical_case: '0',
        apply_reconside_time: '2021-10-16 20:28:53',
        apply_reason: '顾客态度恶劣,并且坐席并无过激言论',
        task_type: '录音质检',
        invalid_phone: ''
    }, {
        agent: '包贝尔(包贝尔)',
        billsec: '3',
        calldate: '2021-10-05 17:35:57',
        calltype: '2',
        cdrid: '539174',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '13692009653',
        hangup: 'Caller',
        id: '1237',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-18 21:23:13","remark":"1235","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2021-10-18 21:23:13',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173558-6001-13692009653-1633426557.26023.wav',
        remark: '1235',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '2',
        ringtime: '16',
        src: '9528(包贝儿)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '0',
        typical_case: '0',
        apply_reconside_time: '2021-10-16 13:33:23',
        apply_reason: '顾客态度强硬，坐席只能尽可能安抚顾客',
        task_type: '录音质检',
        invalid_phone: ''
    }, {
        agent: '张麻子',
        billsec: '79',
        calldate: '2022-4-05 17:36:15',
        calltype: '2',
        cdrid: '539180',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '18084339941',
        hangup: 'Caller',
        id: '1336',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-15 20:30:26","remark":"1","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2022-4-05 20:30:26',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173616-6001-18084339941-1633426575.26025.wav',
        remark: '1',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '0',
        ringtime: '11',
        src: '6001(何倩文)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '0',
        typical_case: '0',
        agent_name: '400客服(中立生物)',
        visitor_num: '13688899669',
        talking_last: '129',
        total_msg_num: '52',
        visitor_msg_num: '31',
        agent_msg_num: '21',
        Interaction_times: '331',
        end_reason: 'question done',
        visitor_name: '赵本山',
        visitor_id: 369,
        start_time: '2021-10-19 16:42:19',
        apply_reconside_time: '2021-10-17 23:23:23',
        apply_reason: '聊天并无违反规定',
        task_type: '在线客服质检'
    }, {
        agent: '贾冰',
        billsec: '0',
        calldate: '2022-4-05 17:35:57',
        calltype: '2',
        cdrid: '539174',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '13692009653',
        hangup: 'Caller',
        id: '1335',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-18 21:23:13","remark":"1235","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2022-4-05 21:23:13',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173558-6001-13692009653-1633426557.26023.wav',
        remark: '1235',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '0',
        ringtime: '16',
        src: '6001(何倩文)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '0',
        typical_case: '0',
        agent_name: '400客服(中立生物)',
        visitor_num: '15688825663',
        talking_last: '89',
        total_msg_num: '52',
        visitor_msg_num: '31',
        agent_msg_num: '21',
        Interaction_times: '331',
        end_reason: 'question done',
        visitor_name: '沈腾',
        visitor_id: 229,
        start_time: '2021-10-19 16:42:19',
        apply_reconside_time: '2021-10-17 19:59:33',
        apply_reason: '聊天并无违反规定',
        task_type: '在线客服质检'
    }],
    pageNo: 1
}
const inspectedData1 = {
    data: [{
        agent: '王刚',
        billsec: '79',
        calldate: '2022-4-05 17:36:15',
        calltype: '2',
        cdrid: '539180',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '18084339941',
        hangup: 'Caller',
        id: '1238',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-15 20:30:26","remark":"1","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2022-4-05 20:30:26',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173616-6001-18084339941-1633426575.26025.wav',
        remark: '1',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '1',
        ringtime: '11',
        src: '6001(何倩文)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '100',
        typical_case: '0',
        agent_name: '400客服(中立生物)',
        visitor_num: '13688899669',
        talking_last: '2000',
        total_msg_num: '52',
        visitor_msg_num: '31',
        agent_msg_num: '21',
        Interaction_times: '331',
        end_reason: 'question done',
        visitor_name: '刘希',
        visitor_id: 332,
        start_time: '2021-10-19 16:42:19',
        before_reconside: '0',
        reconside_status: '已复议',
        reconside_reason: '与客户意见不一,被恶意举报'
    }, {
        agent: '王刚',
        billsec: '0',
        calldate: '2022-4-05 17:35:57',
        calltype: '2',
        cdrid: '539174',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '13692009653',
        hangup: 'Caller',
        id: '1235',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-18 21:23:13","remark":"1235","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2022-4-05 21:23:13',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173558-6001-13692009653-1633426557.26023.wav',
        remark: '1235',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '1',
        ringtime: '16',
        src: '6001(何倩文)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '100',
        typical_case: '0',
        agent_name: '400客服(中立生物)',
        visitor_num: '15688825663',
        talking_last: '2000',
        total_msg_num: '52',
        visitor_msg_num: '31',
        agent_msg_num: '21',
        Interaction_times: '331',
        end_reason: 'question done',
        visitor_name: '王富聚',
        visitor_id: 886,
        start_time: '2021-10-19 16:42:19',
        before_reconside: '100',
        reconside_status: '未复议',
        reconside_reason: ''
    }],
    pageNo: 1
}
const awfulOnlineData = {
    data: [{
        agent: '张麻子',
        billsec: '79',
        calldate: '2022-4-05 17:36:15',
        calltype: '2',
        cdrid: '539180',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '18084339941',
        hangup: 'Caller',
        id: '1336',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-15 20:30:26","remark":"1","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2022-4-05 20:30:26',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173616-6001-18084339941-1633426575.26025.wav',
        remark: '有此问题',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '0',
        ringtime: '11',
        src: '6001(何倩文)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '0',
        typical_case: '0',
        agent_name: '400客服(中立生物)',
        visitor_num: '13688899669',
        talking_last: '129',
        total_msg_num: '52',
        visitor_msg_num: '31',
        agent_msg_num: '21',
        Interaction_times: '331',
        end_reason: 'question done',
        visitor_name: '赵本山',
        visitor_id: 369,
        start_time: '2021-10-19 16:42:19',
        invalid_phone: '',
        before_reconside: '0',
        reconside_status: '未复议',
        reconside_reason: '与客户意见不一,被恶意举报',
        reason: '确认无误'
    }, {
        agent: '贾冰',
        billsec: '0',
        calldate: '2022-4-05 17:35:57',
        calltype: '2',
        cdrid: '539174',
        distribute_agent: 'cwq',
        distribute_time: '2021-10-15 20:28:53',
        dst: '13692009653',
        hangup: 'Caller',
        id: '1335',
        itemsdata: {},
        order_alias: '',
        quality_agent: 'cwq(cwq)',
        quality_agent_setting: '{"cwq":{"field1":0,"field2":0,"field3":0,"field4":0,"field5":0,"field6":0,"field7":0,"field8":0,"field9":0,"field10":0,"field11":0,"field12":0,"remarks":"{\\"field1\\":\\"\\",\\"field2\\":\\"\\",\\"field3\\":\\"\\",\\"field4\\":\\"\\",\\"field5\\":\\"\\",\\"field6\\":\\"\\",\\"field7\\":\\"\\",\\"field8\\":\\"\\",\\"field9\\":\\"\\",\\"field10\\":\\"\\",\\"field11\\":\\"\\",\\"field12\\":\\"\\"}","total_score":"100","quality_time":"2021-10-18 21:23:13","remark":"1235","typical_case":"0","status":1,"result":2,"quality_agent_untreated":""}}',
        quality_agent_untreated: '',
        quality_time: '2022-4-05 21:23:13',
        recordingfile: 'https://donlin.doscs.com/admin/sdk/index/record/?type=download&file=20211005-173558-6001-13692009653-1633426557.26023.wav',
        remark: '有此问题',
        remarks: '{"field1":"","field2":"","field3":"","field4":"","field5":"","field6":"","field7":"","field8":"","field9":"","field10":"","field11":"","field12":""}',
        result: '0',
        ringtime: '16',
        src: '6001(何倩文)',
        status: '1',
        taskid: '20',
        templateid: '1',
        total_score: '0',
        typical_case: '0',
        agent_name: '400客服(中立生物)',
        visitor_num: '15688825663',
        talking_last: '89',
        total_msg_num: '52',
        visitor_msg_num: '31',
        agent_msg_num: '21',
        Interaction_times: '331',
        end_reason: 'question done',
        visitor_name: '沈腾',
        visitor_id: 229,
        start_time: '2021-10-19 16:42:19',
        invalid_phone: '',
        before_reconside: '0',
        reconside_status: '已申请待审批',
        reconside_reason: '客户辱骂在先',
        reason: '初审通过'
    }],
    pageNo: 1
}

const inspectedInit = (options) => {
    const parameters = getBody(options)
    const itemsdata = {
        filed_fieldname: {
            field1: 'itemslistscore_1633934139_1633935318285',
            field2: 'itemsscore_1633935318285',
            field3: 'itemslistscore_1633934139_1633935318286',
            field4: 'itemslistscore_1633934139_1633935318287',
            field5: 'itemslistscore_1633934139_1633935318288',
            field6: 'itemslistscore_1633934139_1633935318289',
            field7: 'itemslistscore_1633934139_1633935318290',
            field8: 'itemsscore_1633935318286',
            field9: 'itemslistscore_1633935318285_1633935318287',
            field10: 'itemslistscore_1633935318286_1633935318288',
            field11: 'itemslistscore_1633935318285_1633935318289',
            field12: 'itemslistscore_1633935318286_1633935318290'
        },
        postdata: {
            itemslistname_1633934139_1633935318285: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉',
            itemslistname_1633934139_1633935318286: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉',
            itemslistname_1633934139_1633935318287: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等',
            itemslistname_1633934139_1633935318288: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉',
            itemslistname_1633934139_1633935318289: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属',
            itemslistname_1633934139_1633935318290: '6、公司红线',
            itemslistname_1633935318285_1633935318287: '语音话术',
            itemslistname_1633935318285_1633935318289: '服务态度',
            itemslistname_1633935318286_1633935318288: '沟通技巧',
            itemslistname_1633935318286_1633935318290: '专业技能',
            itemslistremark_1633934139_1633935318285: '',
            itemslistremark_1633934139_1633935318286: '',
            itemslistremark_1633934139_1633935318287: '',
            itemslistremark_1633934139_1633935318288: '',
            itemslistremark_1633934139_1633935318289: '',
            itemslistremark_1633934139_1633935318290: '',
            itemslistremark_1633935318285_1633935318287: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；\n2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；\n3、准确理解用户表达需求，积极提供有效的解决方案。',
            itemslistremark_1633935318285_1633935318289: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】\n2、用户对该接待员工非常满意，点名指名赞扬称赞；\n3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
            itemslistremark_1633935318286_1633935318288: '1、回复问题表述清晰、易懂；\n2、讲述问题有一定连贯性、逻辑性；\n3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】\n4、吐字清晰、音量适中，以客户的感知度为准\n5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
            itemslistremark_1633935318286_1633935318290: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；\n2、灵活运用售后政策较低成本处理售后问题；\n3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；\n4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”\n5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）\n6、根据公司已宣导的现有流程给予有效的解决方案',
            itemslistscore_1633934139_1633935318285: '',
            itemslistscore_1633934139_1633935318286: '',
            itemslistscore_1633934139_1633935318287: '',
            itemslistscore_1633934139_1633935318288: '',
            itemslistscore_1633934139_1633935318289: '',
            itemslistscore_1633934139_1633935318290: '',
            itemslistscore_1633935318285_1633935318287: '25|20|15|10',
            itemslistscore_1633935318285_1633935318289: '25|20|15|10',
            itemslistscore_1633935318286_1633935318288: '25|20|15|10',
            itemslistscore_1633935318286_1633935318290: '25|20|15|10',
            itemsname_1633934139: '',
            itemsname_1633935318285: '服务部分',
            itemsname_1633935318286: '业务部分',
            itemsscore_1633934139: '0',
            itemsscore_1633935318285: '50',
            itemsscore_1633935318286: '50',
            itemstype_1633934139: '1',
            itemstype_1633935318285: '0',
            itemstype_1633935318286: '0',
            pass_score: '60',
            pass_score2: '15',
            pass_type: '>=',
            pass_type2: '>=',
            templatename: '400语音质检标准'
        },
        template_data: {
            1633934139: {
                list: {
                    1633935318285: { name: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉' },
                    1633935318286: { name: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉' },
                    1633935318287: { name: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等' },
                    1633935318288: { name: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉' },
                    1633935318289: { name: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属' },
                    1633935318290: { name: '6、公司红线' }
                },
                type: '1'
            },
            1633935318285: {
                list: {
                    1633935318287: {
                        name: '语音话术',
                        remark: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；<br/>2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；<br/>3、准确理解用户表达需求，积极提供有效的解决方案。',
                        score: '25|20|15|10'
                    },
                    1633935318289: {
                        name: '服务态度',
                        remark: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】<br/>2、用户对该接待员工非常满意，点名指名赞扬称赞；<br/>3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
                        score: '25|20|15|10'
                    }
                },
                name: '服务部分',
                score: '50',
                type: '0'
            },
            1633935318286: {
                list: {
                    1633935318288: {
                        name: '沟通技巧',
                        remark: '1、回复问题表述清晰、易懂；<br/>2、讲述问题有一定连贯性、逻辑性；<br/>3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】<br/>4、吐字清晰、音量适中，以客户的感知度为准<br/>5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
                        score: '25|20|15|10'
                    },
                    1633935318290: {
                        name: '专业技能',
                        remark: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；<br/>2、灵活运用售后政策较低成本处理售后问题；<br/>3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；<br/>4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”<br/>5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）<br/>6、根据公司已宣导的现有流程给予有效的解决方案',
                        score: '25|20|15|10'
                    }
                },
                name: '业务部分',
                score: '50',
                type: '0'
            }
        }
    }
    let data = [...inspectedData.data, ...awfulRecordData.data]
    data.forEach(item => {
        item.itemsdata = itemsdata
        for (let i = 1; i < 91; i++) {
            item[`field${i}`] = ''
        }
    })
    const arr = ['quality_agent', 'agent', 'src', 'dst']
    arr.forEach(item => {
        if (parameters[item]) {
            data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
        }
    })
    if (parameters.begin_time && parameters.endTime) {
        const startDate = new Date(parameters.begin_time).getTime()
        const endDate = new Date(parameters.endTime).getTime()
        data = data.filter(itemData => new Date(itemData.quality_time).getTime() < endDate && new Date(itemData.quality_time).getTime() > startDate)
    }
    return builder({
        pageNo: inspectedData.pageNo,
        totalCount: data.length,
        data: data
    })
}
const inspectedInit9 = (options) => {
    const parameters = getBody(options)
    const itemsdata = {
        filed_fieldname: {
            field1: 'itemslistscore_1633934139_1633935318285',
            field2: 'itemsscore_1633935318285',
            field3: 'itemslistscore_1633934139_1633935318286',
            field4: 'itemslistscore_1633934139_1633935318287',
            field5: 'itemslistscore_1633934139_1633935318288',
            field6: 'itemslistscore_1633934139_1633935318289',
            field7: 'itemslistscore_1633934139_1633935318290',
            field8: 'itemsscore_1633935318286',
            field9: 'itemslistscore_1633935318285_1633935318287',
            field10: 'itemslistscore_1633935318286_1633935318288',
            field11: 'itemslistscore_1633935318285_1633935318289',
            field12: 'itemslistscore_1633935318286_1633935318290'
        },
        postdata: {
            itemslistname_1633934139_1633935318285: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉',
            itemslistname_1633934139_1633935318286: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉',
            itemslistname_1633934139_1633935318287: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等',
            itemslistname_1633934139_1633935318288: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉',
            itemslistname_1633934139_1633935318289: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属',
            itemslistname_1633934139_1633935318290: '6、公司红线',
            itemslistname_1633935318285_1633935318287: '语音话术',
            itemslistname_1633935318285_1633935318289: '服务态度',
            itemslistname_1633935318286_1633935318288: '沟通技巧',
            itemslistname_1633935318286_1633935318290: '专业技能',
            itemslistremark_1633934139_1633935318285: '',
            itemslistremark_1633934139_1633935318286: '',
            itemslistremark_1633934139_1633935318287: '',
            itemslistremark_1633934139_1633935318288: '',
            itemslistremark_1633934139_1633935318289: '',
            itemslistremark_1633934139_1633935318290: '',
            itemslistremark_1633935318285_1633935318287: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；\n2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；\n3、准确理解用户表达需求，积极提供有效的解决方案。',
            itemslistremark_1633935318285_1633935318289: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】\n2、用户对该接待员工非常满意，点名指名赞扬称赞；\n3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
            itemslistremark_1633935318286_1633935318288: '1、回复问题表述清晰、易懂；\n2、讲述问题有一定连贯性、逻辑性；\n3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】\n4、吐字清晰、音量适中，以客户的感知度为准\n5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
            itemslistremark_1633935318286_1633935318290: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；\n2、灵活运用售后政策较低成本处理售后问题；\n3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；\n4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”\n5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）\n6、根据公司已宣导的现有流程给予有效的解决方案',
            itemslistscore_1633934139_1633935318285: '',
            itemslistscore_1633934139_1633935318286: '',
            itemslistscore_1633934139_1633935318287: '',
            itemslistscore_1633934139_1633935318288: '',
            itemslistscore_1633934139_1633935318289: '',
            itemslistscore_1633934139_1633935318290: '',
            itemslistscore_1633935318285_1633935318287: '25|20|15|10',
            itemslistscore_1633935318285_1633935318289: '25|20|15|10',
            itemslistscore_1633935318286_1633935318288: '25|20|15|10',
            itemslistscore_1633935318286_1633935318290: '25|20|15|10',
            itemsname_1633934139: '',
            itemsname_1633935318285: '服务部分',
            itemsname_1633935318286: '业务部分',
            itemsscore_1633934139: '0',
            itemsscore_1633935318285: '50',
            itemsscore_1633935318286: '50',
            itemstype_1633934139: '1',
            itemstype_1633935318285: '0',
            itemstype_1633935318286: '0',
            pass_score: '60',
            pass_score2: '15',
            pass_type: '>=',
            pass_type2: '>=',
            templatename: '400语音质检标准'
        },
        template_data: {
            1633934139: {
                list: {
                    1633935318285: { name: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉' },
                    1633935318286: { name: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉' },
                    1633935318287: { name: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等' },
                    1633935318288: { name: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉' },
                    1633935318289: { name: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属' },
                    1633935318290: { name: '6、公司红线' }
                },
                type: '1'
            },
            1633935318285: {
                list: {
                    1633935318287: {
                        name: '语音话术',
                        remark: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；<br/>2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；<br/>3、准确理解用户表达需求，积极提供有效的解决方案。',
                        score: '25|20|15|10'
                    },
                    1633935318289: {
                        name: '服务态度',
                        remark: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】<br/>2、用户对该接待员工非常满意，点名指名赞扬称赞；<br/>3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
                        score: '25|20|15|10'
                    }
                },
                name: '服务部分',
                score: '50',
                type: '0'
            },
            1633935318286: {
                list: {
                    1633935318288: {
                        name: '沟通技巧',
                        remark: '1、回复问题表述清晰、易懂；<br/>2、讲述问题有一定连贯性、逻辑性；<br/>3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】<br/>4、吐字清晰、音量适中，以客户的感知度为准<br/>5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
                        score: '25|20|15|10'
                    },
                    1633935318290: {
                        name: '专业技能',
                        remark: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；<br/>2、灵活运用售后政策较低成本处理售后问题；<br/>3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；<br/>4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”<br/>5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）<br/>6、根据公司已宣导的现有流程给予有效的解决方案',
                        score: '25|20|15|10'
                    }
                },
                name: '业务部分',
                score: '50',
                type: '0'
            }
        }
    }
    let data = inspectedData.data
    data.forEach(item => {
        item.itemsdata = itemsdata
        for (let i = 1; i < 91; i++) {
            item[`field${i}`] = ''
        }
    })
    const arr = ['quality_agent', 'agent', 'src', 'dst']
    arr.forEach(item => {
        if (parameters[item]) {
            data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
        }
    })
    if (parameters.begin_time && parameters.endTime) {
        const startDate = new Date(parameters.begin_time).getTime()
        const endDate = new Date(parameters.endTime).getTime()
        data = data.filter(itemData => new Date(itemData.quality_time).getTime() < endDate && new Date(itemData.quality_time).getTime() > startDate)
    }
    return builder({
        pageNo: inspectedData.pageNo,
        totalCount: data.length,
        data: data
    })
}
const inspectedInit1 = (options) => {
    const parameters = getBody(options)
    const itemsdata = {
        filed_fieldname: {
            field1: 'itemslistscore_1633934139_1633935318285',
            field2: 'itemsscore_1633935318285',
            field3: 'itemslistscore_1633934139_1633935318286',
            field4: 'itemslistscore_1633934139_1633935318287',
            field5: 'itemslistscore_1633934139_1633935318288',
            field6: 'itemslistscore_1633934139_1633935318289',
            field7: 'itemslistscore_1633934139_1633935318290',
            field8: 'itemsscore_1633935318286',
            field9: 'itemslistscore_1633935318285_1633935318287',
            field10: 'itemslistscore_1633935318286_1633935318288',
            field11: 'itemslistscore_1633935318285_1633935318289',
            field12: 'itemslistscore_1633935318286_1633935318290'
        },
        postdata: {
            itemslistname_1633934139_1633935318285: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉',
            itemslistname_1633934139_1633935318286: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉',
            itemslistname_1633934139_1633935318287: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等',
            itemslistname_1633934139_1633935318288: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉',
            itemslistname_1633934139_1633935318289: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属',
            itemslistname_1633934139_1633935318290: '6、公司红线',
            itemslistname_1633935318285_1633935318287: '语音话术',
            itemslistname_1633935318285_1633935318289: '服务态度',
            itemslistname_1633935318286_1633935318288: '沟通技巧',
            itemslistname_1633935318286_1633935318290: '专业技能',
            itemslistremark_1633934139_1633935318285: '',
            itemslistremark_1633934139_1633935318286: '',
            itemslistremark_1633934139_1633935318287: '',
            itemslistremark_1633934139_1633935318288: '',
            itemslistremark_1633934139_1633935318289: '',
            itemslistremark_1633934139_1633935318290: '',
            itemslistremark_1633935318285_1633935318287: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；\n2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；\n3、准确理解用户表达需求，积极提供有效的解决方案。',
            itemslistremark_1633935318285_1633935318289: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】\n2、用户对该接待员工非常满意，点名指名赞扬称赞；\n3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
            itemslistremark_1633935318286_1633935318288: '1、回复问题表述清晰、易懂；\n2、讲述问题有一定连贯性、逻辑性；\n3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】\n4、吐字清晰、音量适中，以客户的感知度为准\n5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
            itemslistremark_1633935318286_1633935318290: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；\n2、灵活运用售后政策较低成本处理售后问题；\n3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；\n4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”\n5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）\n6、根据公司已宣导的现有流程给予有效的解决方案',
            itemslistscore_1633934139_1633935318285: '',
            itemslistscore_1633934139_1633935318286: '',
            itemslistscore_1633934139_1633935318287: '',
            itemslistscore_1633934139_1633935318288: '',
            itemslistscore_1633934139_1633935318289: '',
            itemslistscore_1633934139_1633935318290: '',
            itemslistscore_1633935318285_1633935318287: '25|20|15|10',
            itemslistscore_1633935318285_1633935318289: '25|20|15|10',
            itemslistscore_1633935318286_1633935318288: '25|20|15|10',
            itemslistscore_1633935318286_1633935318290: '25|20|15|10',
            itemsname_1633934139: '',
            itemsname_1633935318285: '服务部分',
            itemsname_1633935318286: '业务部分',
            itemsscore_1633934139: '0',
            itemsscore_1633935318285: '50',
            itemsscore_1633935318286: '50',
            itemstype_1633934139: '1',
            itemstype_1633935318285: '0',
            itemstype_1633935318286: '0',
            pass_score: '60',
            pass_score2: '15',
            pass_type: '>=',
            pass_type2: '>=',
            templatename: '400语音质检标准'
        },
        template_data: {
            1633934139: {
                list: {
                    1633935318285: { name: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉' },
                    1633935318286: { name: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉' },
                    1633935318287: { name: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等' },
                    1633935318288: { name: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉' },
                    1633935318289: { name: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属' },
                    1633935318290: { name: '6、公司红线' }
                },
                type: '1'
            },
            1633935318285: {
                list: {
                    1633935318287: {
                        name: '语音话术',
                        remark: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；<br/>2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；<br/>3、准确理解用户表达需求，积极提供有效的解决方案。',
                        score: '25'
                    },
                    1633935318289: {
                        name: '服务态度',
                        remark: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】<br/>2、用户对该接待员工非常满意，点名指名赞扬称赞；<br/>3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
                        score: '25'
                    }
                },
                name: '服务部分',
                score: '50',
                type: '0'
            },
            1633935318286: {
                list: {
                    1633935318288: {
                        name: '沟通技巧',
                        remark: '1、回复问题表述清晰、易懂；<br/>2、讲述问题有一定连贯性、逻辑性；<br/>3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】<br/>4、吐字清晰、音量适中，以客户的感知度为准<br/>5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
                        score: '25|20|15|10'
                    },
                    1633935318290: {
                        name: '专业技能',
                        remark: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；<br/>2、灵活运用售后政策较低成本处理售后问题；<br/>3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；<br/>4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”<br/>5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）<br/>6、根据公司已宣导的现有流程给予有效的解决方案',
                        score: '25|20|15|10'
                    }
                },
                name: '业务部分',
                score: '50',
                type: '0'
            }
        }
    }
    let data = [...inspectedData1.data, ...awfulOnlineData.data]
    data.forEach(item => {
        item.itemsdata = itemsdata
        for (let i = 1; i < 91; i++) {
            item[`field${i}`] = ''
        }
    })
    const arr = ['quality_agent', 'agent', 'src', 'dst']
    arr.forEach(item => {
        if (parameters[item]) {
            data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
        }
    })
    if (parameters.begin_time && parameters.endTime) {
        const startDate = new Date(parameters.begin_time).getTime()
        const endDate = new Date(parameters.endTime).getTime()
        data = data.filter(itemData => new Date(itemData.quality_time).getTime() < endDate && new Date(itemData.quality_time).getTime() > startDate)
    }
    return builder({
        pageNo: inspectedData1.pageNo,
        totalCount: data.length,
        data: data
    })
}

const awfulRecord = (options) => {
    const parameters = getBody(options)
    const itemsdata = {
        filed_fieldname: {
            field1: 'itemslistscore_1633934139_1633935318285',
            field2: 'itemsscore_1633935318285',
            field3: 'itemslistscore_1633934139_1633935318286',
            field4: 'itemslistscore_1633934139_1633935318287',
            field5: 'itemslistscore_1633934139_1633935318288',
            field6: 'itemslistscore_1633934139_1633935318289',
            field7: 'itemslistscore_1633934139_1633935318290',
            field8: 'itemsscore_1633935318286',
            field9: 'itemslistscore_1633935318285_1633935318287',
            field10: 'itemslistscore_1633935318286_1633935318288',
            field11: 'itemslistscore_1633935318285_1633935318289',
            field12: 'itemslistscore_1633935318286_1633935318290'
        },
        postdata: {
            itemslistname_1633934139_1633935318285: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉',
            itemslistname_1633934139_1633935318286: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉',
            itemslistname_1633934139_1633935318287: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等',
            itemslistname_1633934139_1633935318288: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉',
            itemslistname_1633934139_1633935318289: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属',
            itemslistname_1633934139_1633935318290: '6、公司红线',
            itemslistname_1633935318285_1633935318287: '语音话术',
            itemslistname_1633935318285_1633935318289: '服务态度',
            itemslistname_1633935318286_1633935318288: '沟通技巧',
            itemslistname_1633935318286_1633935318290: '专业技能',
            itemslistremark_1633934139_1633935318285: '',
            itemslistremark_1633934139_1633935318286: '',
            itemslistremark_1633934139_1633935318287: '',
            itemslistremark_1633934139_1633935318288: '',
            itemslistremark_1633934139_1633935318289: '',
            itemslistremark_1633934139_1633935318290: '',
            itemslistremark_1633935318285_1633935318287: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；\n2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；\n3、准确理解用户表达需求，积极提供有效的解决方案。',
            itemslistremark_1633935318285_1633935318289: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】\n2、用户对该接待员工非常满意，点名指名赞扬称赞；\n3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
            itemslistremark_1633935318286_1633935318288: '1、回复问题表述清晰、易懂；\n2、讲述问题有一定连贯性、逻辑性；\n3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】\n4、吐字清晰、音量适中，以客户的感知度为准\n5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
            itemslistremark_1633935318286_1633935318290: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；\n2、灵活运用售后政策较低成本处理售后问题；\n3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；\n4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”\n5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）\n6、根据公司已宣导的现有流程给予有效的解决方案',
            itemslistscore_1633934139_1633935318285: '',
            itemslistscore_1633934139_1633935318286: '',
            itemslistscore_1633934139_1633935318287: '',
            itemslistscore_1633934139_1633935318288: '',
            itemslistscore_1633934139_1633935318289: '',
            itemslistscore_1633934139_1633935318290: '',
            itemslistscore_1633935318285_1633935318287: '25|20|15|10',
            itemslistscore_1633935318285_1633935318289: '25|20|15|10',
            itemslistscore_1633935318286_1633935318288: '25|20|15|10',
            itemslistscore_1633935318286_1633935318290: '25|20|15|10',
            itemsname_1633934139: '',
            itemsname_1633935318285: '服务部分',
            itemsname_1633935318286: '业务部分',
            itemsscore_1633934139: '0',
            itemsscore_1633935318285: '50',
            itemsscore_1633935318286: '50',
            itemstype_1633934139: '1',
            itemstype_1633935318285: '0',
            itemstype_1633935318286: '0',
            pass_score: '60',
            pass_score2: '15',
            pass_type: '>=',
            pass_type2: '>=',
            templatename: '400语音质检标准'
        },
        template_data: {
            1633934139: {
                list: {
                    1633935318285: { name: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉' },
                    1633935318286: { name: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉' },
                    1633935318287: { name: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等' },
                    1633935318288: { name: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉' },
                    1633935318289: { name: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属' },
                    1633935318290: { name: '6、公司红线' }
                },
                type: '1'
            },
            1633935318285: {
                list: {
                    1633935318287: {
                        name: '语音话术',
                        remark: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；<br/>2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；<br/>3、准确理解用户表达需求，积极提供有效的解决方案。',
                        score: '25|20|15|10'
                    },
                    1633935318289: {
                        name: '服务态度',
                        remark: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】<br/>2、用户对该接待员工非常满意，点名指名赞扬称赞；<br/>3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
                        score: '25|20|15|10'
                    }
                },
                name: '服务部分',
                score: '50',
                type: '0'
            },
            1633935318286: {
                list: {
                    1633935318288: {
                        name: '沟通技巧',
                        remark: '1、回复问题表述清晰、易懂；<br/>2、讲述问题有一定连贯性、逻辑性；<br/>3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】<br/>4、吐字清晰、音量适中，以客户的感知度为准<br/>5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
                        score: '25|20|15|10'
                    },
                    1633935318290: {
                        name: '专业技能',
                        remark: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；<br/>2、灵活运用售后政策较低成本处理售后问题；<br/>3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；<br/>4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”<br/>5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）<br/>6、根据公司已宣导的现有流程给予有效的解决方案',
                        score: '25|20|15|10'
                    }
                },
                name: '业务部分',
                score: '50',
                type: '0'
            }
        }
    }
    let data = awfulRecordData.data
    data.forEach(item => {
        item.itemsdata = itemsdata
        for (let i = 1; i < 91; i++) {
            item[`field${i}`] = ''
        }
    })
    const arr = ['quality_agent', 'agent', 'src', 'dst']
    arr.forEach(item => {
        if (parameters[item]) {
            data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
        }
    })
    if (parameters.begin_time && parameters.endTime) {
        const startDate = new Date(parameters.begin_time).getTime()
        const endDate = new Date(parameters.endTime).getTime()
        data = data.filter(itemData => new Date(itemData.quality_time).getTime() < endDate && new Date(itemData.quality_time).getTime() > startDate)
    }
    return builder({
        pageNo: inspectedData.pageNo,
        totalCount: data.length,
        data: data
    })
}
const awfulOnline = (options) => {
    const parameters = getBody(options)
    const itemsdata = {
        filed_fieldname: {
            field1: 'itemslistscore_1633934139_1633935318285',
            field2: 'itemsscore_1633935318285',
            field3: 'itemslistscore_1633934139_1633935318286',
            field4: 'itemslistscore_1633934139_1633935318287',
            field5: 'itemslistscore_1633934139_1633935318288',
            field6: 'itemslistscore_1633934139_1633935318289',
            field7: 'itemslistscore_1633934139_1633935318290',
            field8: 'itemsscore_1633935318286',
            field9: 'itemslistscore_1633935318285_1633935318287',
            field10: 'itemslistscore_1633935318286_1633935318288',
            field11: 'itemslistscore_1633935318285_1633935318289',
            field12: 'itemslistscore_1633935318286_1633935318290'
        },
        postdata: {
            itemslistname_1633934139_1633935318285: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉',
            itemslistname_1633934139_1633935318286: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉',
            itemslistname_1633934139_1633935318287: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等',
            itemslistname_1633934139_1633935318288: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉',
            itemslistname_1633934139_1633935318289: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属',
            itemslistname_1633934139_1633935318290: '6、公司红线',
            itemslistname_1633935318285_1633935318287: '语音话术',
            itemslistname_1633935318285_1633935318289: '服务态度',
            itemslistname_1633935318286_1633935318288: '沟通技巧',
            itemslistname_1633935318286_1633935318290: '专业技能',
            itemslistremark_1633934139_1633935318285: '',
            itemslistremark_1633934139_1633935318286: '',
            itemslistremark_1633934139_1633935318287: '',
            itemslistremark_1633934139_1633935318288: '',
            itemslistremark_1633934139_1633935318289: '',
            itemslistremark_1633934139_1633935318290: '',
            itemslistremark_1633935318285_1633935318287: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；\n2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；\n3、准确理解用户表达需求，积极提供有效的解决方案。',
            itemslistremark_1633935318285_1633935318289: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】\n2、用户对该接待员工非常满意，点名指名赞扬称赞；\n3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
            itemslistremark_1633935318286_1633935318288: '1、回复问题表述清晰、易懂；\n2、讲述问题有一定连贯性、逻辑性；\n3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】\n4、吐字清晰、音量适中，以客户的感知度为准\n5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
            itemslistremark_1633935318286_1633935318290: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；\n2、灵活运用售后政策较低成本处理售后问题；\n3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；\n4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”\n5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）\n6、根据公司已宣导的现有流程给予有效的解决方案',
            itemslistscore_1633934139_1633935318285: '',
            itemslistscore_1633934139_1633935318286: '',
            itemslistscore_1633934139_1633935318287: '',
            itemslistscore_1633934139_1633935318288: '',
            itemslistscore_1633934139_1633935318289: '',
            itemslistscore_1633934139_1633935318290: '',
            itemslistscore_1633935318285_1633935318287: '25|20|15|10',
            itemslistscore_1633935318285_1633935318289: '25|20|15|10',
            itemslistscore_1633935318286_1633935318288: '25|20|15|10',
            itemslistscore_1633935318286_1633935318290: '25|20|15|10',
            itemsname_1633934139: '',
            itemsname_1633935318285: '服务部分',
            itemsname_1633935318286: '业务部分',
            itemsscore_1633934139: '0',
            itemsscore_1633935318285: '50',
            itemsscore_1633935318286: '50',
            itemstype_1633934139: '1',
            itemstype_1633935318285: '0',
            itemstype_1633935318286: '0',
            pass_score: '60',
            pass_score2: '15',
            pass_type: '>=',
            pass_type2: '>=',
            templatename: '400语音质检标准'
        },
        template_data: {
            1633934139: {
                list: {
                    1633935318285: { name: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉' },
                    1633935318286: { name: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉' },
                    1633935318287: { name: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等' },
                    1633935318288: { name: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉' },
                    1633935318289: { name: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属' },
                    1633935318290: { name: '6、公司红线' }
                },
                type: '1'
            },
            1633935318285: {
                list: {
                    1633935318287: {
                        name: '语音话术',
                        remark: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；<br/>2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；<br/>3、准确理解用户表达需求，积极提供有效的解决方案。',
                        score: '25|20|15|10'
                    },
                    1633935318289: {
                        name: '服务态度',
                        remark: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】<br/>2、用户对该接待员工非常满意，点名指名赞扬称赞；<br/>3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
                        score: '25|20|15|10'
                    }
                },
                name: '服务部分',
                score: '50',
                type: '0'
            },
            1633935318286: {
                list: {
                    1633935318288: {
                        name: '沟通技巧',
                        remark: '1、回复问题表述清晰、易懂；<br/>2、讲述问题有一定连贯性、逻辑性；<br/>3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】<br/>4、吐字清晰、音量适中，以客户的感知度为准<br/>5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
                        score: '25|20|15|10'
                    },
                    1633935318290: {
                        name: '专业技能',
                        remark: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；<br/>2、灵活运用售后政策较低成本处理售后问题；<br/>3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；<br/>4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”<br/>5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）<br/>6、根据公司已宣导的现有流程给予有效的解决方案',
                        score: '25|20|15|10'
                    }
                },
                name: '业务部分',
                score: '50',
                type: '0'
            }
        }
    }
    let data = awfulOnlineData.data
    data.forEach(item => {
        item.itemsdata = itemsdata
        for (let i = 1; i < 91; i++) {
            item[`field${i}`] = ''
        }
    })
    const arr = ['quality_agent', 'agent', 'src', 'dst']
    arr.forEach(item => {
        if (parameters[item]) {
            data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
        }
    })
    if (parameters.begin_time && parameters.endTime) {
        const startDate = new Date(parameters.begin_time).getTime()
        const endDate = new Date(parameters.endTime).getTime()
        data = data.filter(itemData => new Date(itemData.quality_time).getTime() < endDate && new Date(itemData.quality_time).getTime() > startDate)
    }
    return builder({
        pageNo: inspectedData.pageNo,
        totalCount: data.length,
        data: data
    })
}
const reviewReconside = (options) => {
    const parameters = getBody(options)
    const itemsdata = {
        filed_fieldname: {
            field1: 'itemslistscore_1633934139_1633935318285',
            field2: 'itemsscore_1633935318285',
            field3: 'itemslistscore_1633934139_1633935318286',
            field4: 'itemslistscore_1633934139_1633935318287',
            field5: 'itemslistscore_1633934139_1633935318288',
            field6: 'itemslistscore_1633934139_1633935318289',
            field7: 'itemslistscore_1633934139_1633935318290',
            field8: 'itemsscore_1633935318286',
            field9: 'itemslistscore_1633935318285_1633935318287',
            field10: 'itemslistscore_1633935318286_1633935318288',
            field11: 'itemslistscore_1633935318285_1633935318289',
            field12: 'itemslistscore_1633935318286_1633935318290'
        },
        postdata: {
            itemslistname_1633934139_1633935318285: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉',
            itemslistname_1633934139_1633935318286: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉',
            itemslistname_1633934139_1633935318287: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等',
            itemslistname_1633934139_1633935318288: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉',
            itemslistname_1633934139_1633935318289: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属',
            itemslistname_1633934139_1633935318290: '6、公司红线',
            itemslistname_1633935318285_1633935318287: '语音话术',
            itemslistname_1633935318285_1633935318289: '服务态度',
            itemslistname_1633935318286_1633935318288: '沟通技巧',
            itemslistname_1633935318286_1633935318290: '专业技能',
            itemslistremark_1633934139_1633935318285: '',
            itemslistremark_1633934139_1633935318286: '',
            itemslistremark_1633934139_1633935318287: '',
            itemslistremark_1633934139_1633935318288: '',
            itemslistremark_1633934139_1633935318289: '',
            itemslistremark_1633934139_1633935318290: '',
            itemslistremark_1633935318285_1633935318287: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；\n2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；\n3、准确理解用户表达需求，积极提供有效的解决方案。',
            itemslistremark_1633935318285_1633935318289: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】\n2、用户对该接待员工非常满意，点名指名赞扬称赞；\n3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
            itemslistremark_1633935318286_1633935318288: '1、回复问题表述清晰、易懂；\n2、讲述问题有一定连贯性、逻辑性；\n3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】\n4、吐字清晰、音量适中，以客户的感知度为准\n5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
            itemslistremark_1633935318286_1633935318290: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；\n2、灵活运用售后政策较低成本处理售后问题；\n3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；\n4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”\n5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）\n6、根据公司已宣导的现有流程给予有效的解决方案',
            itemslistscore_1633934139_1633935318285: '',
            itemslistscore_1633934139_1633935318286: '',
            itemslistscore_1633934139_1633935318287: '',
            itemslistscore_1633934139_1633935318288: '',
            itemslistscore_1633934139_1633935318289: '',
            itemslistscore_1633934139_1633935318290: '',
            itemslistscore_1633935318285_1633935318287: '25|20|15|10',
            itemslistscore_1633935318285_1633935318289: '25|20|15|10',
            itemslistscore_1633935318286_1633935318288: '25|20|15|10',
            itemslistscore_1633935318286_1633935318290: '25|20|15|10',
            itemsname_1633934139: '',
            itemsname_1633935318285: '服务部分',
            itemsname_1633935318286: '业务部分',
            itemsscore_1633934139: '0',
            itemsscore_1633935318285: '50',
            itemsscore_1633935318286: '50',
            itemstype_1633934139: '1',
            itemstype_1633935318285: '0',
            itemstype_1633935318286: '0',
            pass_score: '60',
            pass_score2: '15',
            pass_type: '>=',
            pass_type2: '>=',
            templatename: '400语音质检标准'
        },
        template_data: {
            1633934139: {
                list: {
                    1633935318285: { name: '1、恶意辱骂或侮辱客用户，或与顾客直接冲突、因服务问题导致的投诉' },
                    1633935318286: { name: '2、用户明确表示投诉意向时，客服未进行挽留，未反馈用户需求或主动引导客户升级投诉' },
                    1633935318287: { name: '3、泄露内部信息、内部资料，或泄露用户信息违反职业道德、欺诈行为等' },
                    1633935318288: { name: '4、过度承诺用户，因个人工作疏忽导致公司利益受损或错误回复导致用户投诉' }
                    // 1633935318289: { name: '5、沟通中客户明确表示要投诉客服服务态度问题，核实属' },
                    // 1633935318290: { name: '6、公司红线' }
                },
                type: '1'
            },
            1633935318285: {
                list: {
                    1633935318287: {
                        name: '语音话术',
                        remark: '1、正确完整的使用话术：开头结尾话术、致歉关怀貌用语、评价邀请，等语音话术；<br/>2、普通话标准、语气友善和蔼、声音明朗清晰、积极热情、不卑不亢；<br/>3、准确理解用户表达需求，积极提供有效的解决方案。',
                        score: '25|20|15|10'
                    },
                    1633935318289: {
                        name: '服务态度',
                        remark: '1、有良好的沟通安抚技能，能较好的安抚客户情绪；【基础版如：您好，是在是很抱歉的，您的心情这边很理解，如果是我的话也会生气的呢。为了更好处理您的问题，麻烦您稍微等待一下，这边了解一下情况哈】<br/>2、用户对该接待员工非常满意，点名指名赞扬称赞；<br/>3、思路条理清晰，逻辑正确，语言流畅、简短、易懂，善组织语言巧妙回答问题，有自己独特语言风格；',
                        score: '25|20|15|10'
                    }
                },
                name: '服务部分',
                score: '50',
                type: '0'
            },
            1633935318286: {
                list: {
                    1633935318288: {
                        name: '沟通技巧',
                        remark: '1、回复问题表述清晰、易懂；<br/>2、讲述问题有一定连贯性、逻辑性；<br/>3、有良好引导能力，能掌握话语权，能正确引导客户快速解决问题【能给出解决方案】<br/>4、吐字清晰、音量适中，以客户的感知度为准<br/>5、语速适中，注意与客户的语速匹配，不要过快或过慢，恰当把握轻重缓急，抑扬顿挫',
                        score: '25|20|15|10'
                    },
                    1633935318290: {
                        name: '专业技能',
                        remark: '1、处理及时主动，流程清晰，认真负责，为用户排忧解难，服务体验好；<br/>2、灵活运用售后政策较低成本处理售后问题；<br/>3、规避差评风险，服务感受非常满意，产品知识传达无误，对于客户的疑问，能从专业的角度进行分析与解答；<br/>4、针对顾客问题适当调整话术，更为贴切回复，更为针对解决问题，不进行模棱两可的回复“好的呢”<br/>5、对于客户反馈的问题灵活处理，相同话术只用只一次（客户要求发送除外）<br/>6、根据公司已宣导的现有流程给予有效的解决方案',
                        score: '25|20|15|10'
                    }
                },
                name: '业务部分',
                score: '50',
                type: '0'
            }
        }
    }
    let data = reviewReconsideData.data
    data.forEach(item => {
        item.itemsdata = itemsdata
        for (let i = 1; i < 91; i++) {
            item[`field${i}`] = ''
        }
    })
    const arr = ['quality_agent', 'agent', 'src', 'dst']
    arr.forEach(item => {
        if (parameters[item]) {
            data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
        }
    })
    if (parameters.begin_time && parameters.endTime) {
        const startDate = new Date(parameters.begin_time).getTime()
        const endDate = new Date(parameters.endTime).getTime()
        data = data.filter(itemData => new Date(itemData.quality_time).getTime() < endDate && new Date(itemData.quality_time).getTime() > startDate)
    }
    return builder({
        pageNo: inspectedData.pageNo,
        totalCount: data.length,
        data: data
    })
}
// 权限管理
const powerData = {
    data: [{
        already_priv: { checked: 'true', agent_priv: [] },
        number: '',
        id: '128',
        realName: '百胜图网点客服',
        userName: '百胜图网点客服'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '127',
        realName: '售后主管',
        userName: '售后主管'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '126',
        realName: '吴木健',
        userName: '吴木健'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '125',
        realName: 'cwq',
        userName: 'cwq'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '124',
        realName: '米高',
        userName: '米高'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '123',
        realName: '周海欣',
        userName: '周海欣'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '122',
        realName: 'chenwenqing',
        userName: 'chenwenqing'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '121',
        realName: '周冠豪',
        userName: '周冠豪'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '120',
        realName: '黄美娟',
        userName: '王美娟'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '119',
        realName: '一个业务员',
        userName: '一个业务员'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '118',
        realName: '廖云峰',
        userName: '廖云峰'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '117',
        realName: '业务负责人',
        userName: '业务负责人'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '116',
        realName: '王富聚',
        userName: '王富聚'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '115',
        realName: 'xdn',
        userName: 'xdn'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '114',
        realName: '测试网点负责人1',
        userName: '测试网点负责人1'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '113',
        realName: '财务出库审核',
        userName: '财务出库审核'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '112',
        realName: '经销商01',
        userName: '经销商01'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '111',
        realName: '彭伟梅',
        userName: '彭伟梅'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '110',
        realName: 'zxy',
        userName: 'zxy'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '6040',
        id: '109',
        realName: '肖青香',
        userName: '肖青香'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '6039',
        id: '108',
        realName: '黄娟',
        userName: '黄娟'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '6038',
        id: '107',
        realName: '李慧娴',
        userName: '李慧娴'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '6037',
        id: '106',
        realName: '李连红',
        userName: '李连红'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '',
        id: '103',
        realName: '陈嘉鑫',
        userName: '陈嘉鑫'
    }, {
        already_priv: { checked: '', agent_priv: [] },
        number: '6029',
        id: '101',
        realName: '中立生物',
        userName: '400客服'
    }]
}
const powerInit = (options) => {
    let data = powerData.data
    const parameters = getBody(options)
    const arr = ['userName', 'realName', 'number']
    arr.forEach(item => {
        if (parameters[item]) {
            data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
        }
    })
    return builder({
        pageNo: parameters.pageNo,
        totalCount: data.length,
        data: data
    })
}
const statisticsData = {
    data: [{
        department_name: '质检部',
        quality_agent: '王也',
        quality_number: '24',
        pass_number: '12',
        nopass_number: '12',
        good_number: '6',
        appeal_number: '6',
        recheck_number: '4',
        record_time: 1652508945

    }, {
        department_name: '质检部',
        quality_agent: '张楚岚',
        quality_number: '64',
        pass_number: '52',
        nopass_number: '12',
        good_number: '50',
        appeal_number: '3',
        recheck_number: '4',
        record_time: 1652508945

    }, {
        department_name: '质检部',
        quality_agent: '诸葛青',
        quality_number: '50',
        pass_number: '30',
        nopass_number: '20',
        good_number: '20',
        appeal_number: '3',
        recheck_number: '2',
        record_time: 1652508945
    }]
}

const statisticsInit = (options) => {
    const data = statisticsData.data
    const parameters = getBody(options)
    // const arr = ['userName', 'realName', 'number']
    // arr.forEach(item => {
    //     if (parameters[item]) {
    //         data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
    //     }
    // })
    return builder({
        pageNo: parameters.pageNo,
        totalCount: data.length,
        data: data
    })
}
const seatStatisticsData = {
    data: [{
        department_name: '售后部',
        agent: '张丽',
        quality_number: 50,
        pass_number: 30,
        nopass_number: 20,
        invalid_number: 0,
        record_time: 1652508945

    }, {
        department_name: '售前部',
        agent: '孙火旺',
        quality_number: 10,
        pass_number: 10,
        nopass_number: 10,
        invalid_number: 0,
        record_time: 1652508945

    }, {
        department_name: '售后部',
        agent: '卜合礼',
        quality_number: 60,
        pass_number: 50,
        nopass_number: 0,
        invalid_number: 10,
        record_time: 1652508945

    }, {
        department_name: '投诉部',
        agent: '项少龙',
        quality_number: 20,
        pass_number: 20,
        nopass_number: 0,
        invalid_number: 0,
        record_time: 1652508945

    }]
}

const seatStatisticsInit = (options) => {
    const data = seatStatisticsData.data
    const parameters = getBody(options)
    // const arr = ['userName', 'realName', 'number']
    // arr.forEach(item => {
    //     if (parameters[item]) {
    //         data = data.filter(itemData => itemData[item].search(parameters[item]) > -1)
    //     }
    // })
    return builder({
        pageNo: parameters.pageNo,
        totalCount: data.length,
        data: data
    })
}

// 模板管理初始化数据
Mock.mock(/\/quality\/template\/mockInit/, 'post', templateInit)
// 模板管理获取用户信息
Mock.mock(/\/quality\/template\/mockGetUsername/, 'post', templateUser)
// 任务管理初始化数据
Mock.mock(/\/quality\/task\/mockInit/, 'post', taskInit)
// 任务管理获取模板信息
Mock.mock(/\/quality\/task\/mockGetTemplate/, 'post', taskTemplate)
// 任务管理查看进度
Mock.mock(/\/quality\/task\/mockViewProgress/, 'post', taskProcess)
// 任务管理查看明细
Mock.mock(/\/quality\/task\/mockViewDetails/, 'post', taskDetail)
// 待质检任务初始化数据
Mock.mock(/\/quality\/test\/mockInit/, 'post', testInit)
// 待质检任务查看明细
Mock.mock(/\/quality\/test\/mockViewDetails/, 'post', testDetail)
// 已质检录音初始化数据
Mock.mock(/\/quality\/inspected\/mockInit/, 'post', inspectedInit)
Mock.mock(/\/quality\/inspected9\/mockInit/, 'post', inspectedInit9)
// 零分录音
Mock.mock(/\/quality\/awfulRecord\/mockInit/, 'post', awfulRecord)
// 零分在线
Mock.mock(/\/quality\/awfulOnline\/mockInit/, 'post', awfulOnline)
// 已质检在线客服初始化数据
Mock.mock(/\/quality\/inspected1\/mockInit/, 'post', inspectedInit1)
// 权限管理初始化数据
Mock.mock(/\/quality\/powered\/mockInit/, 'post', powerInit)
// 质检员质检统计
Mock.mock(/\/quality\/statistics\/mockInit/, 'post', statisticsInit)
// 坐席绩效统计
Mock.mock(/\/quality\/statistics\/agent/, 'post', seatStatisticsInit)
// 待审核复议
Mock.mock(/\/quality\/reviewReconside\/mockInit/, 'post', reviewReconside)
