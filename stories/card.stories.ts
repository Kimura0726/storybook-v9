import { Meta, StoryObj } from "@storybook/html";
import cardHTML from "../src/components/card/card.html?raw";

// カードコンポーネントのプロパティ型定義
interface CardProps {
  title: string;
  content: string;
  footerText: string;
  theme?: "light" | "dark" | "colorful";
  showCloseButton?: boolean;
  onClose?: () => void;
}

// HTMLカードコンポーネントを生成する関数
const createCard = (args: CardProps): HTMLElement => {
  const {
    title,
    content,
    footerText,
    theme = "light",
    showCloseButton = false,
    onClose,
  } = args;

  // 条件付きの部分を処理
  let processedHTML = cardHTML
    .replace("{{title}}", title)
    .replace("{{content}}", content)
    .replace("{{footerText}}", footerText)
    .replace("{{themeClass}}", `theme-${theme}`);

  // 条件分岐を処理（簡易的なテンプレートエンジン）
  if (showCloseButton) {
    processedHTML = processedHTML
      .replace("{{#if showCloseButton}}", "")
      .replace("{{/if}}", "");
  } else {
    // 条件ブロック全体を削除
    const regex = /\{\{#if showCloseButton\}\}([\s\S]*?)\{\{\/if\}\}/gm;
    processedHTML = processedHTML.replace(regex, "");
  }

  const template = document.createElement("template");
  template.innerHTML = processedHTML.trim();
  const card = template.content.firstElementChild as HTMLElement;

  // クローズボタンがあれば、イベントリスナーを追加
  if (showCloseButton && onClose) {
    const closeButton = card.querySelector(".card-close-btn");
    if (closeButton) {
      closeButton.addEventListener("click", onClose);
    }
  }

  return card;
};

// メタデータ
const meta: Meta<CardProps> = {
  title: "Components/Card",
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "カードのタイトル",
    },
    content: {
      control: "text",
      description: "カードの本文",
    },
    footerText: {
      control: "text",
      description: "カードのフッターテキスト",
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark", "colorful"],
      description: "カードのテーマカラー",
      table: {
        defaultValue: { summary: "light" },
      },
    },
    showCloseButton: {
      control: "boolean",
      description: "閉じるボタンを表示するかどうか",
    },
    onClose: {
      action: "closed",
      description: "閉じるボタンがクリックされたときのイベントハンドラ",
    },
  },
};

export default meta;

// 各ストーリータイプを定義
type Story = StoryObj<CardProps>;

// 基本的なカード
export const Default: Story = {
  render: (args) => createCard(args),
  args: {
    title: "カードタイトル",
    content: "これはカードの内容です。ここにテキストや画像などを配置します。",
    footerText: "最終更新: 2023年4月1日",
    theme: "light",
    showCloseButton: false,
  },
};

// 閉じるボタン付きカード
export const WithCloseButton: Story = {
  render: (args) => createCard(args),
  args: {
    title: "閉じるボタン付きカード",
    content: "このカードには右上に閉じるボタンがあります。",
    footerText: "フッターテキスト",
    showCloseButton: true,
  },
};

// ダークテーマ
export const DarkTheme: Story = {
  render: (args) => createCard(args),
  args: {
    title: "ダークテーマ",
    content: "ダークモードのカードです。背景色と文字色が調整されています。",
    footerText: "ダークテーマフッター",
    theme: "dark",
  },
};

// カラフルテーマ
export const ColorfulTheme: Story = {
  render: (args) => createCard(args),
  args: {
    title: "カラフルテーマ",
    content:
      "カラフルなデザインのカードです。アクセントカラーが使われています。",
    footerText: "カラフルフッター",
    theme: "colorful",
    showCloseButton: true,
  },
};
