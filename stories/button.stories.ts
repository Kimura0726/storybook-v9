import { Meta, StoryObj } from "@storybook/html";
import buttonHTML from "../src/components/button/button.html?raw";
// import { userEvent, within } from "@storybook/test";

// ボタンコンポーネントのプロパティ型定義
interface ButtonProps {
  label: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  onClick?: () => void;
}

// HTMLボタンコンポーネントを生成する関数
const createButton = (args: ButtonProps): HTMLElement => {
  const {
    label,
    size = "medium",
    variant = "primary",
    disabled = false,
    onClick,
  } = args;

  // プレースホルダーを置換
  let html = buttonHTML
    .replace("{{label}}", label)
    .replace("{{sizeClass}}", `btn-${size}`)
    .replace("{{variantClass}}", `btn-${variant}`)
    .replace("{{disabledAttr}}", disabled ? "disabled" : "");

  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const button = template.content.firstElementChild as HTMLElement;

  // イベントリスナーを追加（存在する場合）
  // if (onClick) {
  //   button.addEventListener("click", onClick);
  // }

  return button;
};

// メタデータ
const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "ボタンに表示されるテキスト",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "ボタンのサイズ",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["primary", "secondary", "danger", "success"],
      description: "ボタンのスタイルバリエーション",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: "boolean",
      description: "ボタンの無効状態",
    },
    onClick: {
      action: "clicked",
      description: "クリック時のイベントハンドラ",
    },
  },
};

export default meta;

// 各ストーリータイプを定義
type Story = StoryObj<ButtonProps>;

// 基本的なボタン
export const Primary: Story = {
  render: (args) => createButton(args),
  args: {
    label: "Primary Button",
    variant: "primary",
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   await userEvent.click(canvas.getByTestId("btn"));
  // },
  // parameters: {},
};

// セカンダリボタン
export const Secondary: Story = {
  render: (args) => createButton(args),
  args: {
    label: "Secondary Button",
    variant: "secondary",
  },
};

// 成功ボタン
export const Success: Story = {
  render: (args) => createButton(args),
  args: {
    label: "Success Button",
    variant: "success",
  },
};

// 危険ボタン
export const Danger: Story = {
  render: (args) => createButton(args),
  args: {
    label: "Danger Button",
    variant: "danger",
  },
};

// サイズのバリエーション
export const Small: Story = {
  render: (args) => createButton(args),
  args: {
    label: "Small Button",
    size: "small",
  },
};

export const Large: Story = {
  render: (args) => createButton(args),
  args: {
    label: "Large Button",
    size: "large",
  },
};

// 無効状態
export const Disabled: Story = {
  render: (args) => createButton(args),
  args: {
    label: "Disabled Button",
    disabled: true,
  },
};
