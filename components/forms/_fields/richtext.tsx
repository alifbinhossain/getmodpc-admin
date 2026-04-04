'use client';

import React from 'react';

import { getTaskListExtension, Link, RichTextEditor } from '@mantine/tiptap';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TaskItem from '@tiptap/extension-task-item';
import TipTapTaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { FieldError as IFieldError } from 'react-hook-form';

import { FieldError } from '@/components/ui/field';

import { IFormRichText } from '../_config/form-types';
import { FormBase } from '../_helper/form-base';
import { cn } from '@/lib/utils';

type Props = {
  content: string;
  onValueChange: (value: string) => void;
  maxChars?: number;
  fieldId: string;
  fieldError: IFieldError | undefined;
  className?: string;
};

function RichTextEditorComponent({
  content,
  onValueChange,
  maxChars,
  fieldId,
  fieldError,
  className,
}: Props) {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Image,
      Color,
      getTaskListExtension(TipTapTaskList),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'test-item',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onValueChange(editor.getHTML());
    },
  });

  // Sync external value → editor
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [editor, content]);

  if (!editor) {
    return (
      <div className='min-h-50 border rounded-md bg-gray-50 animate-pulse' />
    );
  }

  return (
    <div className='space-y-2'>
      {/* ✅ SCROLLABLE WRAPPER */}
      <div className='w-full border rounded-md max-h-100 overflow-y-auto'>
        <RichTextEditor editor={editor}>
          {/* ✅ STICKY TOOLBAR */}
          <RichTextEditor.Toolbar className='sticky top-0 z-10 bg-white dark:bg-gray-900 border-b'>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
              <RichTextEditor.Control
                onClick={() => {
                  const url = window.prompt('Enter image URL');
                  if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
                  }
                }}
              >
                🖼️
              </RichTextEditor.Control>
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
              <RichTextEditor.H5 />
              <RichTextEditor.H6 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.TaskList />
              <RichTextEditor.TaskListLift />
              <RichTextEditor.TaskListSink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Control>
                <input
                  type='color'
                  onChange={(e) => editor.commands.setColor(e.target.value)}
                />
              </RichTextEditor.Control>

              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          {/* ✅ CONTENT */}
          <RichTextEditor.Content className={cn('min-h-50 p-4' , className)}/>
        </RichTextEditor>
      </div>

      {/* ✅ FOOTER */}
      <div className='flex items-center justify-between'>
        {fieldError ? (
          <FieldError className='text-xs' errors={[fieldError]} />
        ) : (
          maxChars && <span />
        )}

        {maxChars && (
          <p id={fieldId} className='text-xs text-gray-400 tabular-nums'>
            {editor.getText().length}/{maxChars}
          </p>
        )}
      </div>
    </div>
  );
}

export const FormRichText: IFormRichText = ({ maxChars,className, ...props }) => {
  return (
    <FormBase disableError {...props}>
      {(field) => (
        <RichTextEditorComponent
          content={field.value}
          onValueChange={field.onChange}
          maxChars={maxChars}
          fieldId={field.id}
          fieldError={field.error}
          className={className}
        />
      )}
    </FormBase>
  );
};
