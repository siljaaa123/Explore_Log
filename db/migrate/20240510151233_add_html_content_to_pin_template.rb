class AddHtmlContentToPinTemplate < ActiveRecord::Migration[7.1]
  def change
    add_column :pin_templates, :html_content, :text
  end
end
