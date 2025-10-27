import type{ Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "무선 이어폰",
    price: 89000,
    image: "https://via.placeholder.com/300x200.png?text=Wireless+Earbuds",
    description: "고음질 블루투스 무선 이어폰입니다.",
  },
  {
    id: 2,
    name: "스마트 워치",
    price: 129000,
    image: "https://via.placeholder.com/300x200.png?text=Smart+Watch",
    description: "헬스 트래킹 기능이 포함된 스마트워치입니다.",
  },
  {
    id: 3,
    name: "게이밍 마우스",
    price: 59000,
    image: "https://via.placeholder.com/300x200.png?text=Gaming+Mouse",
    description: "RGB 백라이트와 정밀 센서를 지원합니다.",
  },
];
