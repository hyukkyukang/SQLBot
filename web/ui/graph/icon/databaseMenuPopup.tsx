import databases from "@/ui/graph/config/databases";
import CloseIcon from "@/ui/graph/icon/closeIcon";
import { DatabaseMenuPopupProps } from "@/ui/graph/icon/infoPopup";
import { markdown } from "@/ui/graph/markdown";

export default function DatabaseMenuPopup(props: DatabaseMenuPopupProps) {
  const databaseHref = ((databaseName: string) => {
    if(process.env.NODE_ENV === "production") {
      return `/sql_schema_visualizer/databases/${databaseName}`
    } else {
      return `/databases/${databaseName}`;
    }
  });

  return (
    <div
      className="info-popup">
      <div className="info-popup__inner">
        <CloseIcon
          className="info-popup__close-icon"
          onClick={() => { props.onClose() }} />

        <h1
          className="info-popup__headline"
          dangerouslySetInnerHTML={{__html: markdown(props.headline) }} />

        {props.subheadline && <h2
          className="info-popup__subheadline"
          dangerouslySetInnerHTML={{__html: markdown(props.subheadline) }} />}

        <div className="info-popup__body">
          {Object.keys(databases).map(databaseName => {
            return (
              <div key={databaseName}>
                <h3
                  className="info-popup__database-name">
                  { /* design_notes/0001_using_regular_links.md */}
                  <a href={databaseHref(databaseName)}>{databases[databaseName].name}</a>
                </h3>

                <p
                  dangerouslySetInnerHTML={{__html: markdown(databases[databaseName].description || "No description.") }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};