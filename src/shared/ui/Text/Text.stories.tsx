import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Text, TextTheme } from "./Text";

export default {
  title: "shared/Text",
  component: Text,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Title lasd zxxxx",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: "Title lasd zxxxx",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: "Title lasd zxxxx",
};

export const ErrorTrue = Template.bind({});
ErrorTrue.args = {
  title: "Title lasd zxxxx",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
  theme: TextTheme.ERROR,
};

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: "Title lasd zxxxx",
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
};

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid",
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];
