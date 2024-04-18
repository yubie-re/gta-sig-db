import json

def load_json(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {'RTMA': [], 'INTG': []}

def save_json(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def merge_and_deduplicate(old_data, new_data):
    # Merging data
    combined = {
        'RTMA': old_data.get('RTMA', []) + new_data.get('RTMA', []),
        'INTG': old_data.get('INTG', []) + new_data.get('INTG', [])
    }

    # Deduplicating data
    for key in combined:
        unique = {json.dumps(sig, sort_keys=True): sig for sig in combined[key]}
        combined[key] = list(unique.values())

    return combined

if __name__ == "__main__":
    existing_sigs = load_json('sig_db.json')
    new_sigs = load_json('signatures.json')  # Assuming new data is stored here after tool execution
    updated_sigs = merge_and_deduplicate(existing_sigs, new_sigs)
    save_json(updated_sigs, 'sig_db.json')