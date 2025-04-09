import { fontSizeConfigAtom, isTextSelectableAtom } from '@/store'
import type { Word } from '@/typings'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'

export type ExampleSentenceProps = {
  word: Word
  isTextSelectable?: boolean
}

export default function ExampleSentence({ word }: ExampleSentenceProps) {
  const fontSizeConfig = useAtomValue(fontSizeConfigAtom)
  const isTextSelectable = useAtomValue(isTextSelectableAtom)

  const randomExample = useCallback((examples: string[]) => {
    if (!examples || examples.length === 0) return ''
    const randomIndex = Math.floor(Math.random() * examples.length)
    return examples[randomIndex]
  }, [])

  const exampleSentence = useMemo(() => {
    return word.examples ? randomExample(word.examples) : ''
  }, [word.examples, randomExample])

  // 如果没有例句，则不显示组件
  if (!exampleSentence) return null

  return (
    <div className="flex items-center justify-center pb-4 pt-2">
      <span
        className={`max-w-4xl text-center font-sans italic text-gray-700 transition-colors duration-300 dark:text-white dark:text-opacity-70 ${
          isTextSelectable && 'select-text'
        }`}
        style={{ fontSize: fontSizeConfig.translateFont.toString() + 'px' }}
      >
        {exampleSentence}
      </span>
    </div>
  )
}
