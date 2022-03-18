import { HeroInterface } from "src/app/shared/types/interfaces/hero";

export interface HeroStateInterface {
    selectedHero: HeroInterface | null;
    hero: HeroInterface | null;
    allHeros: HeroInterface[] | null;
}