class CreateCommits < ActiveRecord::Migration[5.2]
  def change
    create_table :commits do |t|
      t.string :sha
      t.string :author
      t.string :committer
      t.string :message

      t.timestamps
    end
  end
end
