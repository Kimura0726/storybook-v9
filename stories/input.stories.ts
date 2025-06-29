import { Meta, StoryObj } from "@storybook/html";
import inputHTML from "../src/components/input/input.html?raw";
// import { userEvent, within } from "@storybook/test";

// 入力フォームコンポーネントのプロパティ型定義
interface InputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  size?: "small" | "medium" | "large";
  variant?: "default" | "success" | "error" | "warning";
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  errorMessage?: string;
  showError?: boolean;
  onChange?: (event: Event) => void;
}

// HTML入力フォームコンポーネントを生成する関数
const createInput = (args: InputProps): HTMLElement => {
  const {
    id,
    label,
    type = "text",
    placeholder = "",
    value = "",
    size = "medium",
    variant = "default",
    required = false,
    disabled = false,
    readonly = false,
    errorMessage = "",
    showError = false,
    onChange,
  } = args;

  // プレースホルダーを置換
  let html = inputHTML
    .replace("{{id}}", id)
    .replace("{{label}}", label)
    .replace("{{type}}", type)
    .replace("{{placeholder}}", placeholder)
    .replace("{{value}}", value)
    .replace("{{sizeClass}}", `input-${size}`)
    .replace("{{variantClass}}", `input-${variant}`)
    .replace("{{labelClass}}", required ? "required" : "")
    .replace("{{requiredAttr}}", required ? "required" : "")
    .replace("{{disabledAttr}}", disabled ? "disabled" : "")
    .replace("{{readonlyAttr}}", readonly ? "readonly" : "")
    .replace("{{errorMessage}}", errorMessage)
    .replace("{{errorClass}}", showError ? `show ${variant}` : "");

  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const inputGroup = template.content.firstElementChild as HTMLElement;

  // イベントリスナーを追加（存在する場合）
  if (onChange) {
    const input = inputGroup.querySelector("input");
    if (input) {
      input.addEventListener("input", onChange);
    }
  }

  return inputGroup;
};

// メタデータ
const meta: Meta<InputProps> = {
  title: "Components/Input",
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "入力フィールドのID",
    },
    label: {
      control: "text",
      description: "ラベルテキスト",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "入力フィールドのタイプ",
      table: {
        defaultValue: { summary: "text" },
      },
    },
    placeholder: {
      control: "text",
      description: "プレースホルダーテキスト",
    },
    value: {
      control: "text",
      description: "入力フィールドの値",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "入力フィールドのサイズ",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "success", "error", "warning"],
      description: "入力フィールドのスタイルバリエーション",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    required: {
      control: "boolean",
      description: "必須入力の状態",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
    readonly: {
      control: "boolean",
      description: "読み取り専用状態",
    },
    errorMessage: {
      control: "text",
      description: "エラーメッセージ",
    },
    showError: {
      control: "boolean",
      description: "エラーメッセージの表示状態",
    },
    onChange: {
      action: "changed",
      description: "値変更時のイベントハンドラ",
    },
  },
};

export default meta;

// 各ストーリータイプを定義
type Story = StoryObj<InputProps>;

// 基本的な入力フィールド
export const Default: Story = {
  render: (args) => createInput(args),
  args: {
    id: "default-input",
    label: "名前",
    placeholder: "名前を入力してください",
  },
};

// 必須入力フィールド
export const Required: Story = {
  render: (args) => createInput(args),
  args: {
    id: "required-input",
    label: "メールアドレス",
    type: "email",
    placeholder: "email@example.com",
    required: true,
  },
};

// エラー状態
export const Error: Story = {
  render: (args) => createInput(args),
  args: {
    id: "error-input",
    label: "パスワード",
    type: "password",
    placeholder: "パスワードを入力",
    variant: "error",
    errorMessage: "パスワードは8文字以上で入力してください",
    showError: true,
    value: "123",
  },
};

// 成功状態
export const Success: Story = {
  render: (args) => createInput(args),
  args: {
    id: "success-input",
    label: "電話番号",
    type: "tel",
    placeholder: "000-0000-0000",
    variant: "success",
    errorMessage: "正しい形式で入力されています",
    showError: true,
    value: "090-1234-5678",
  },
};

// 警告状態
export const Warning: Story = {
  render: (args) => createInput(args),
  args: {
    id: "warning-input",
    label: "年齢",
    type: "number",
    placeholder: "年齢を入力",
    variant: "warning",
    errorMessage: "18歳未満の方は保護者の同意が必要です",
    showError: true,
    value: "16",
  },
};

// サイズのバリエーション
export const Small: Story = {
  render: (args) => createInput(args),
  args: {
    id: "small-input",
    label: "小さなサイズ",
    size: "small",
    placeholder: "小さな入力フィールド",
  },
};

export const Large: Story = {
  render: (args) => createInput(args),
  args: {
    id: "large-input",
    label: "大きなサイズ",
    size: "large",
    placeholder: "大きな入力フィールド",
  },
};

// 無効状態
export const Disabled: Story = {
  render: (args) => createInput(args),
  args: {
    id: "disabled-input",
    label: "無効な入力フィールド",
    placeholder: "入力できません",
    disabled: true,
    value: "編集不可",
  },
};

// 読み取り専用
export const Readonly: Story = {
  render: (args) => createInput(args),
  args: {
    id: "readonly-input",
    label: "読み取り専用",
    placeholder: "読み取り専用",
    readonly: true,
    value: "この値は変更できません",
  },
};

// URLタイプ
export const URL: Story = {
  render: (args) => createInput(args),
  args: {
    id: "url-input",
    label: "ウェブサイト",
    type: "url",
    placeholder: "https://example.com",
  },
};
