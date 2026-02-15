import { ScrollStage } from "@/components/sections/ScrollStage";
import { TestimonialsWall } from "@/components/sections/TestimonialsWall";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <ScrollStage />
      <TestimonialsWall />
      <CtaBanner />
    </>
  );
}
