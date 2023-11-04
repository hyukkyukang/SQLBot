import os
import argparse
import logging
import hkkang_utils.file as file_utils

logger = logging.getLogger("JSON Converter")


def main(src_path: str, dst_path: str) -> None:
    # Read in csv file
    data = file_utils.read_csv_file(src_path)

    # Gather information
    dic = {}
    for row in data:
        table_name = row["table_name"]
        if table_name not in dic:
            dic[table_name] = []
        dic[table_name].append(row)
    
    # Write to json file
    for table_name, value in dic.items():
        # Create column informations
        columns = []
        for item in value:
            columns.append({
                "name": item["column_name"],
                "description": "",
                "key": False,
                "type": item["data_type"],
            })
        meta_info = {
            "name": table_name,
            "description": "",
            "schemaColor": "#91C4F2",
            "columns": columns,
        }
        dst_file_path = os.path.join(dst_path, f"{table_name}.json")
        logger.info(f"Write {table_name} to {dst_file_path}")
        os.makedirs(os.path.dirname(dst_file_path), exist_ok=True)
        file_utils.write_json_file(meta_info, dst_file_path)
    


def parse_args():
    parser = argparse.ArgumentParser(description="Convert .csv to json files")
    parser.add_argument(
        "--src_path",
        type=str,
        help="Path to the source csv file.",
        default="output.csv",
    )
    parser.add_argument(
        "--dst_dir",
        type=str,
        help="Path to the destination directory (to save JSON files).",
        default="web/databases/cars/tables",
    )
    return parser.parse_args()


if __name__ == "__main__":
    logging.basicConfig(
        format="[%(asctime)s %(levelname)s %(name)s] %(message)s",
        datefmt="%m/%d %H:%M:%S",
        level=logging.INFO,
    )

    args = parse_args()
    src_path = args.src_path
    dst_path = args.dst_dir
    main(src_path, dst_path)
    logger.info("Done!")