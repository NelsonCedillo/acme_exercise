import { hourToMin } from "./modules";

describe("Test function hourToMin",()=>{
    test("Test data Input",()=>{
        expect(hourToMin(["12:00-14:00","16:00-20:00"])).toEqual(["720-840","960-1200"]);
    })
})