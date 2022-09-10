import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';
import { useState } from 'react';

export type FormPostProps = {
  onSave?: (post: StrapiPost) => Promise<void>;
  post?: StrapiPost;
};
export const FormPost = ({ post, onSave }: FormPostProps) => {
  const { title = '', content = '', id = '' } = post || {}; // to not be traped
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [saving, setSaving] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const newPost = { id, title: newTitle, content: newContent };

    if (onSave) {
      await onSave(newPost);
    }
    setSaving(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="post-id" value={id} />
      <TextInput
        name={'post-title'}
        label={'Post Title'}
        value={newTitle}
        onInputChange={(v) => {
          setNewTitle(v);
        }}
      />

      <TextInput
        name={'post-content'}
        label={'Post content'}
        value={newContent}
        as={'textarea'}
        onInputChange={(v) => setNewContent(v)}
      />

      <Button type="submit" disabled={saving}>
        {saving ? 'Enviando' : 'Enviar'}
      </Button>
    </form>
  );
};
