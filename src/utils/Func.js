import moment from 'moment';
import { getCurrentUser } from '@/utils/authority';
import { onlinePreviewUrl } from './defaultSettings';

/**
 * 通用工具类
 */
export default class Func {
    /**
     * 获取文件预览路径
     * @param fullFileName
     * @returns {string}
     */
    static getPreviewURL(fullFileName) {
        const watermarkTxt = this.getWatermarkTxt();
        return `${onlinePreviewUrl}?watermarkTxt=${watermarkTxt}&fullFileName=${fullFileName}`;
    }

    /**
     * 获取水印文字
     * @returns {string}
     */
    static getWatermarkTxt() {
        const user = getCurrentUser();
        const suffix = user.phone ? user.phone.substring(user.phone.length - 4) : this.getToday();
        return `${user.realName} ${suffix}`;
    }

    /**
     * 获取今天日期字符串
     * @returns {string}
     */
    static getToday() {
        const date = new Date();
        return date.toLocaleDateString();
    }

    /**
     * 不为空
     * @param val
     * @returns {boolean}
     */
    static notEmpty(val) {
        return !this.isEmpty(val);
    }

    /**
     * 为空
     * @param val
     * @returns {boolean}
     */
    static isEmpty(val) {
        if (
            val === null ||
            typeof val === 'undefined' ||
            (typeof val === 'string' && val === '' && val !== 'undefined')
        ) {
            return true;
        }
        return false;
    }

    static isEmptyObject(val) {
        if (val === null || typeof val === 'undefined') {
            return true;
        }
        if (typeof val === 'object') {
            const arr = Object.keys(val);
            if (arr.length === 0) {
                return true;
            }
            return false;
        }
        return true;
    }

    /**
     * 强转int型
     * @param val
     * @param defaultValue
     * @returns {number}
     */
    static toInt(val, defaultValue) {
        if (this.isEmpty(val)) {
            return defaultValue === undefined ? -1 : defaultValue;
        }
        const num = parseInt(val, 0);
        return Number.isNaN(num) ? (defaultValue === undefined ? -1 : defaultValue) : num;
    }

    /**
     * Json强转为Form类型
     * @param obj
     * @returns {FormData}
     */
    static toFormData(obj) {
        const data = new FormData();
        Object.keys(obj).forEach((key) => {
            data.append(key, Array.isArray(obj[key]) ? obj[key].join(',') : obj[key]);
        });
        return data;
    }

    /**
     * 字符串转为date类
     * @param date
     * @param format
     * @returns {any}
     */
    static moment(date, format = 'YYYY-MM-DD HH:mm:ss') {
        return date ? moment(date, format) : null;
    }

    /**
     * 字符串转为date类
     * @param date
     * @param format
     * @returns {any}
     */
    static momentTime(date, format = 'HH:mm') {
        return date ? moment(date, format) : null;
    }

    /**
     * date类转为字符串格式
     * @param date
     * @param format
     * @returns {null}
     */
    static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
        return date ? date.format(format) : null;
    }

    /**
     * 根据逗号联合
     * @param arr
     * @returns {string}
     */
    static join(arr) {
        return arr ? arr.join(',') : '';
    }

    /**
     * 根据逗号分隔
     * @param str
     * @returns {string}
     */
    static split(str) {
        return str ? String(str).split(',') : '';
    }

    static val(object, path, value) {
        let copyObject = object;
        let s = path.replace(/\[(\w+)\]/g, '.$1');
        s = s.replace(/^\./, '');
        const a = s.split('.');
        for (let i = 0, n = a.length; i < n; i += 1) {
            const k = a[i];
            if (k in copyObject) {
                if (!this.isEmpty(value) && i === n - 1) {
                    copyObject[k] = value;
                }
                copyObject = copyObject[k];
            } else if (!this.isEmpty(value)) {
                if (i === n - 1) {
                    copyObject[k] = value;
                } else {
                    copyObject[k] = {};
                    copyObject = copyObject[k];
                }
            } else {
                return null;
            }
        }
        return copyObject;
    }

    static getDateDiff(dateTime) {
        let dateTimeStamp = new Date();
        if (dateTime instanceof Date) {
            dateTimeStamp = dateTime;
        } else {
            dateTimeStamp = new Date(dateTime).getTime();
        }

        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const now = new Date().getTime();
        const diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            return;
        }
        const monthC = diffValue / month;
        const weekC = diffValue / (7 * day);
        const dayC = diffValue / day;
        const hourC = diffValue / hour;
        const minC = diffValue / minute;
        let result = '';
        if (monthC >= 1) {
            result = `${parseInt(monthC, 10)}月前`;
        } else if (weekC >= 1) {
            result = `${parseInt(weekC, 10)}周前`;
        } else if (dayC >= 1) {
            result = `${parseInt(dayC, 10)}天前`;
        } else if (hourC >= 1) {
            result = `${parseInt(hourC, 10)}小时前`;
        } else if (minC >= 1) {
            result = `${parseInt(minC, 10)}分钟前`;
        } else result = '刚刚';
        return result;
    }

    static getDateDiff2(dateTime) {
        let dateTimeStamp = new Date();
        if (dateTime instanceof Date) {
            dateTimeStamp = dateTime;
        } else {
            dateTimeStamp = new Date(dateTime).getTime();
        }

        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = month * 12;
        const now = new Date().getTime();
        const diffValue = dateTimeStamp - now;
        if (diffValue < 0) {
            return;
        }
        const yearC = diffValue / year;
        const dayC = diffValue / day;
        const hourC = diffValue / hour;
        const minC = diffValue / minute;
        let result = '';
        if (yearC >= 1) {
            result = `${parseInt(yearC, 10)}年`;
        } else if (dayC >= 1) {
            result = `${parseInt(dayC, 10)}天`;
        }
        return result;
    }

    static dataTimeToData(dateTime) {
        if (dateTime instanceof Date) {
            return format(dateTime).split(' ')[0];
        }
        return dateTime.split(' ')[0];
    }

    /**
     * 获取到期天数，如果已过期，返回0
     * @param data
     * @returns {*|string}
     */
    static getDueNumberOfDays(dateTime) {
        let dateTimeStamp = new Date();
        if (dateTime instanceof Date) {
            dateTimeStamp = dateTime;
        } else {
            dateTimeStamp = new Date(dateTime).getTime();
        }
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const now = new Date().getTime();
        const diffValue = dateTimeStamp - now;
        if (diffValue < 0) {
            return 0;
        }
        return `${parseInt(diffValue / day, 10)}`;
    }

    /**
     * 保留两位小数
     * @param data
     * @returns {*|string}
     */
    static percent(data) {
        if (data != null) {
            return data.toFixed(2);
        }
        return 0;
    }

    /**
     * 禁用今天之前的日期
     * @param current
     * @returns {*|boolean}
     */
    static disabledDate(current) {
        return current && current < moment().subtract(1, 'day');
    }

    /**
     * 禁用今天之后的日期
     * @param current
     * @returns {*|boolean}
     */
    static disabledAfterDate(current) {
        return current > moment().subtract(0, 'day');
    }

    /**
     * 邮箱
     * @param s
     * @returns {boolean}
     */
    static isEmail = (s) => {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
    };

    // 获取当前月的开始结束时间
    static getCurrMonthDays() {
        const date = [];
        const start = moment().startOf('month');
        const end = moment().endOf('month');
        date.push(start);
        date.push(end);
        return date;
    }

    // 获取当前半年的开始结束时间
    static getCurrHalfYearDays() {
        const date = [];
        const month = moment().month();
        let start;
        let end;
        // 上半年
        if (month < 6) {
            start = moment().startOf('year');
            end = moment([moment().year(), 5, 30]); // 月份从0开始
            // 下半年
        } else {
            start = moment([moment().year(), 6, 1]); // 月份从0开始
            end = moment().endOf('year');
        }
        date.push(start);
        date.push(end);
        return date;
    }

    // 获取当前年的开始结束时间
    static getCurrYearDays() {
        const date = [];
        const start = moment().startOf('year');
        const end = moment().endOf('year');
        date.push(start);
        date.push(end);
        return date;
    }

    // num传入的数字，n需要的字符长度
    static PrefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }

    static deepCompare(x, y) {
        let i;
        let l;
        let leftChain;
        let rightChain;

        function compare2Objects(x, y) {
            let p;

            // remember that NaN === NaN returns false
            // and isNaN(undefined) returns true
            if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                return true;
            }

            // Compare primitives and functions.
            // Check if both arguments link to the same object.
            // Especially useful on the step where we compare prototypes
            if (x === y) {
                return true;
            }

            // Works in case when functions are created in constructor.
            // Comparing dates is a common scenario. Another built-ins?
            // We can even handle functions passed across iframes
            if (
                (typeof x === 'function' && typeof y === 'function') ||
                (x instanceof Date && y instanceof Date) ||
                (x instanceof RegExp && y instanceof RegExp) ||
                (x instanceof String && y instanceof String) ||
                (x instanceof Number && y instanceof Number)
            ) {
                return x.toString() === y.toString();
            }

            // At last checking prototypes as good as we can
            if (!(x instanceof Object && y instanceof Object)) {
                return false;
            }

            if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                return false;
            }

            if (x.constructor !== y.constructor) {
                return false;
            }

            if (x.prototype !== y.prototype) {
                return false;
            }

            // Check for infinitive linking loops
            if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                return false;
            }

            // Quick checking of one object being a subset of another.
            // todo: cache the structure of arguments[0] for performance
            for (p in y) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                if (typeof y[p] !== typeof x[p]) {
                    return false;
                }
            }

            for (p in x) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                if (typeof y[p] !== typeof x[p]) {
                    return false;
                }

                switch (typeof x[p]) {
                    case 'object':
                    case 'function':
                        leftChain.push(x);
                        rightChain.push(y);

                        if (!compare2Objects(x[p], y[p])) {
                            return false;
                        }

                        leftChain.pop();
                        rightChain.pop();
                        break;

                    default:
                        if (x[p] !== y[p]) {
                            return false;
                        }
                        break;
                }
            }

            return true;
        }

        if (arguments.length < 1) {
            return true; // Die silently? Don't know how to handle such case, please help...
            // throw "Need two or more arguments to compare";
        }

        for (i = 1, l = arguments.length; i < l; i++) {
            leftChain = []; // Todo: this can be cached
            rightChain = [];

            if (!compare2Objects(arguments[0], arguments[i])) {
                return false;
            }
        }

        return true;
    }

    static removeArrayItem(arr, item) {
        const index = arr.indexOf(item);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    static numberToChinaChar(number) {
        const charArry = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        if (number > charArry.length || number < 0) {
            return number;
        }
        return charArry[number];
    }

    /**
     * 身份证校验
     * @param value
     * @returns {boolean|boolean}
     */
    static checkIDCard = (value) => {
        // 加权因子
        const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        // 校验码
        const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

        const code = value + '';
        const last = value[17];

        const seventeen = code.substring(0, 17);

        // ISO 7064:1983.MOD 11-2
        // 判断最后一位校验码是否正确
        const arr = seventeen.split('');
        const len = arr.length;
        let num = 0;
        for (let i = 0; i < len; i += 1) {
            num += arr[i] * weight_factor[i];
        }

        // 获取余数
        const resisue = num % 11;
        const last_no = check_code[resisue];

        // 格式的正则
        // 正则思路
        /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
        const idcard_patter =
            /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

        // 判断格式是否正确
        const format = idcard_patter.test(value);

        // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
        return last === last_no && format;
    };

    // 事务详情页按钮隐藏显示逻辑 非本人承办事务和状态不处理办理中隐藏所有按钮
    static affairActionButtonsFiler = (status, user, lawyerList) => {
        // 判断是否超级管理员
        if (user.authority === 'administrator') {
            return true;
        }
        // 是否承办人
        let isRepeat = false;
        for (let i = 0; i < lawyerList.length; i++) {
            if (lawyerList[i].id === user.userId) {
                isRepeat = true;
                break;
            }
        }
        // 承办人 && 编辑状态
        if (isRepeat && status === 2) {
            return true;
        }
        return false;
    };

    // 事务详情页日常法律服务（合同事务信息编辑、材料上传，法律咨询咨询信息编辑）按钮隐藏显示逻辑 非本人承办事务隐藏所有按钮
    static dailyLegalServicesButtonsFiler = (user, lawyerList) => {
        // 判断是否超级管理员
        if (user.authority === 'administrator') {
            return true;
        }
        // 是否承办人
        let isRepeat = false;
        for (let i = 0; i < lawyerList.length; i++) {
            if (lawyerList[i].id === user.userId) {
                isRepeat = true;
                break;
            }
        }
        // 承办人
        if (isRepeat) {
            return true;
        }
        return false;
    };

    static isEmail = (s) => {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
    };

    static getNum(text) {
        return text.replace(/[^0-9]/gi, '');
    }

    /**
     * 组装代理方地位所需数组
     * @param title
     * @param mainBodyList
     * @returns {[]|*[]}
     */
    static getMainBodyList(title, mainBodyList) {
        if (mainBodyList) {
            const mainBodys = [];
            const proposerListLength = mainBodyList.length;
            for (let i = 0; i < proposerListLength; i += 1) {
                const values = {
                    key: `${title}${i + 1}`,
                    value: mainBodyList[i].name,
                    no: i + 1,
                    relatedParty: title,
                    relatedPartyName: mainBodyList[i].name
                };
                mainBodys.push(values);
            }
            return mainBodys;
        }
        return [];
    }

    /**
     * 获取cookie中制定的值
     * @param name
     * @returns {string}
     */
    static getCookie(name) {
        // 获取cookie字符串
        const strCookie = document.cookie;
        // 分割
        const arrCookie = strCookie.split('; ');
        // 遍历匹配
        for (let i = 0; i < arrCookie.length; i += 1) {
            const arr = arrCookie[i].split('=');
            if (arr[0] === name) {
                return arr[1];
            }
        }
        return '';
    }

    static clearNoNum(value) {
        // 第一个字符是小数点的情况.
        if (value !== '' && value.substr(0, 1) === '.') {
            return '';
        }
        value = value.replace(/^0*(0\.|[1-9])/, '$1'); //解决 粘贴不生效
        value = value.replace(/[^\d.]/g, ''); //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, '.'); //只保留第一个. 清除多余的
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        if (value.indexOf('.') < 0 && value !== '') {
            //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (value.substr(0, 1) === '0' && value.length === 2) {
                value = value.substr(1, value.length);
            }
        }
        value = value.replace(/^\D*([1-9]\d*\.?\d{0,2})?.*$/, '$1');
        return value;
    }

    static limitDecimals(value) {
        const reg = /^(\-)*(\d+)\.(\d\d).*$/;
        console.log(value);
        if (typeof value === 'string') {
            return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : '';
        } else if (typeof value === 'number') {
            return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : '';
        } else {
            return '';
        }
    }

    static changeNumberMoneyToChinese(money) {
        // 接收数字或者字符串数字
        if (typeof money === 'string') {
            if (money === '') return '';
            if (isNaN(parseFloat(money))) {
                throw Error(`参数有误：${money}，请输入数字或字符串数字`);
            } else {
                // 去掉分隔符(,)
                money = money.replace(/,/g, '');
            }
        } else if (typeof money === 'number') {
            // 去掉分隔符(,)
            money = money.toString().replace(/,/g, '');
        } else {
            throw Error(`参数有误：${money}，请输入数字或字符串数字`);
        }
        // 汉字的数字
        const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        // 基本单位
        const cnIntRadice = ['', '拾', '佰', '仟'];
        // 对应整数部分扩展单位
        const cnIntUnits = ['', '万', '亿', '兆'];
        // 对应小数部分单位
        const cnDecUnits = ['角', '分', '毫', '厘'];
        // 整数金额时后面跟的字符
        const cnInteger = '整';
        // 整型完以后的单位
        const cnIntLast = '元';
        // 金额整数部分
        let IntegerNum;
        // 金额小数部分
        let DecimalNum;
        // 输出的中文金额字符串
        let ChineseStr = '';
        // 正负值标记
        let Symbol = '';
        // 转成浮点数
        money = parseFloat(money);
        // 如果是0直接返回结果
        if (money === 0) {
            ChineseStr = cnNums[0] + cnIntLast + cnInteger;
            return ChineseStr;
        }
        // 如果小于0，则将Symbol标记为负，并转为正数
        if (money < 0) {
            money = -money;
            Symbol = '负 ';
        }
        // 转换为字符串
        money = money.toString();
        // 将整数部分和小数部分分别存入IntegerNum和DecimalNum
        if (money.indexOf('.') === -1) {
            IntegerNum = money;
            DecimalNum = '';
        } else {
            const moneyArr = money.split('.');
            IntegerNum = moneyArr[0];
            DecimalNum = moneyArr[1].substr(0, 4);
        }
        // 获取整型部分转换
        if (parseInt(IntegerNum, 10) > 0) {
            let zeroCount = 0;
            let IntLen = IntegerNum.length;
            for (let i = 0; i < IntLen; i++) {
                // 获取整数的每一项
                let term = IntegerNum.substr(i, 1);
                // 剩余待处理的数量
                let surplus = IntLen - i - 1;
                // 用于获取整数部分的扩展单位
                // 剩余数量除以4，比如12345，term为1时，expandUnit则为1，
                // cnIntUnits[expandUnit]对应得到的单位为万
                let expandUnit = surplus / 4;
                // 用于获取整数部分的基本单位
                // 剩余数量取余4，比如123，那么第一遍遍历term为1，surplus为2，baseUnit则为2，
                // 所以cnIntRadice[baseUnit]对应得到的基本单位为'佰'
                let baseUnit = surplus % 4;
                if (term === '0') {
                    zeroCount++;
                } else {
                    // 连续存在多个0的时候需要补'零'
                    if (zeroCount > 0) {
                        ChineseStr += cnNums[0];
                    }
                    // 归零
                    zeroCount = 0;
                    /*
          cnNums是汉字的零到玖组成的数组，term则是阿拉伯0-9，
          直接将阿拉伯数字作为下标获取中文数字
          例如term是0则cnNums[parseInt(term)]取的就是'零'，9取的就是'玖'
          最后加上单位就转换成功了！
          这里只加十百千的单位
          */
                    ChineseStr += cnNums[parseInt(term)] + cnIntRadice[baseUnit];
                }
                /*
          如果baseUnit为0，意味着当前项和下一项隔了一个节权位即隔了一个逗号
          扩展单位只有大单位进阶才需要，判断是否大单位进阶，则通过zeroCount判断
          baseUnit === 0即存在逗号，baseUnit === 0 && zeroCount < 4 意为大单位进阶
        */
                if (baseUnit === 0 && zeroCount < 4) {
                    ChineseStr += cnIntUnits[expandUnit];
                }
            }
            ChineseStr += cnIntLast;
        }
        // 小数部分转换
        if (DecimalNum !== '') {
            let decLen = DecimalNum.length;
            for (let i = 0; i < decLen; i++) {
                // 同理，参考整数部分
                let term = DecimalNum.substr(i, 1);
                if (term !== '0') {
                    ChineseStr += cnNums[Number(term)] + cnDecUnits[i];
                }
            }
        }
        ChineseStr = Symbol + ChineseStr;
        return ChineseStr;
    }

    /**
     * 手机号脱敏处理，如果手机号存在-，中间4位显示*
     * @param deptName
     * @returns {string}
     */
    static phoneSensitive(phone) {
        if (phone) {
            return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
        return '';
    }

    /**
     * 部门脱敏处理，如果部门路径存在-，只显示最后一个路径，其余显示*
     * @param deptName
     * @returns {string}
     */
    static deptSensitive(deptName) {
        if (deptName) {
            const deptLastIndex = deptName.lastIndexOf('-');
            return deptLastIndex === -1 ? deptName : `****${deptName.substring(deptLastIndex)}`;
        }
        return '';
    }

    /**
     * 删除字符串中的数字
     * @param str
     * @returns {*}
     */
    static deleteNum(str) {
        const reg = /[0-9]+/g;
        return str.replace(reg, '');
    }
}
