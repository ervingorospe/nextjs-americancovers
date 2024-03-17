import React from 'react'
// layouts
import { Section, Container, HeroLayout } from "@/app/layouts"

export async function DefaultHero({ data }) {
  return (
    <Section className="relative w-full overflow-hidden" bg="secondary-700">
      <HeroLayout>
        <Container className="z-1 relative" width="max-w-screen-2xl" margin="hero">
          <div className="text-center">
            <h1 className="font-heading font-bold text-white text-4xl md:text-4xl lg:text-5xl">{data.name}</h1>
          </div>
        </Container>
      </HeroLayout>
    </Section>
  )
}
