from datetime import date
from kaggle.api.kaggle_api_extended import KaggleApi


def publish_to_kaggle(folder, message):
    api = KaggleApi()
    api.authenticate()

    api.dataset_create_version(
        folder=folder,
        version_notes=message
    )

if __name__ == "__main__":

    prep_location = 'data'

    print("--> Publish to Kaggle")
    publish_to_kaggle(prep_location, str(date.today()))
    print("Kaggle Upload Ok")