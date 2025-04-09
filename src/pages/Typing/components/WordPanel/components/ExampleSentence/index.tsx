import Tooltip from '@/components/Tooltip'
import { SoundIcon } from '@/components/WordPronunciationIcon/SoundIcon'
import useSpeech from '@/hooks/useSpeech'
import { fontSizeConfigAtom, isTextSelectableAtom, pronunciationConfigAtom } from '@/store'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'

export type ExampleSentenceProps = {
  example: string[]
  showExample?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function ExampleSentence({ example, showExample = true, onMouseEnter, onMouseLeave }: ExampleSentenceProps) {
  const pronunciationConfig = useAtomValue(pronunciationConfigAtom)
  const fontSizeConfig = useAtomValue(fontSizeConfigAtom)
  const isShowExampleRead = window.speechSynthesis && pronunciationConfig.isTransRead
  const speechOptions = useMemo(() => ({ volume: pronunciationConfig.transVolume }), [pronunciationConfig.transVolume])
  const { speak, speaking } = useSpeech(example.join(' '), speechOptions)

  const handleClickSoundIcon = useCallback(() => {
    speak(true)
  }, [speak])

  const isTextSelectable = useAtomValue(isTextSelectableAtom)

  if (!example || example.length === 0) {
    return null
  }

  return (
    <div className={`flex items-center justify-center pb-4 pt-2`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div
        className={`flex max-w-4xl flex-col items-center text-center font-sans transition-colors duration-300 dark:text-white dark:text-opacity-80 ${
          isShowExampleRead && 'pl-8'
        } ${isTextSelectable && 'select-text'}`}
        style={{ fontSize: fontSizeConfig.translateFont.toString() + 'px' }}
      >
        {showExample
          ? example.map((sentence, index) => (
              <span key={index} className="mb-2">
                {sentence}
              </span>
            ))
          : '\u00A0'}
      </div>
      {isShowExampleRead && showExample && example.length > 0 && (
        <Tooltip content="朗读例句" className="ml-3 h-5 w-5 cursor-pointer leading-7">
          <SoundIcon animated={speaking} onClick={handleClickSoundIcon} className="h-5 w-5" />
        </Tooltip>
      )}
    </div>
  )
}
