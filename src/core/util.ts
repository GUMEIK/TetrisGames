/**
 * 产生随机数(无法去到最大值)
 * @param min 最小值
 * @param max 最大值
 */
export function getRandom(min:number,max:number){
    // 求差
    const dec = max - min;
    return Math.floor(Math.random()*dec + min);
}