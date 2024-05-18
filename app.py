from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

# Define colors for each type
colors = {
    "fire": '#FDDFDF',
    "grass": '#DEFDE0',
    "electric": '#FCF7DE',
    "water": '#DEF3FD',
    "ground": '#f4e7da',
    "rock": '#d5d5d4',
    "fairy": '#fceaff',
    "poison": '#98d7a5',
    "bug": '#f8d5a3',
    "dragon": '#97b3e6',
    "psychic": '#eaeda1',
    "flying": '#F5F5F5',
    "fighting": '#E6E0D4',
    "normal": '#F5F5F5'
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pokemon/<int:id>', methods=['GET'])
def get_pokemon(id):
    url = f'https://pokeapi.co/api/v2/pokemon/{id}'
    res = requests.get(url)
    data = res.json()
    poke_types = [t['type']['name'] for t in data['types']]
    type_ = next((t for t in colors if t in poke_types), 'normal')
    color = colors.get(type_, '#F5F5F5')
    pokemon_data = {
        'id': str(data['id']).zfill(3),
        'name': data['name'].capitalize(),
        'type': type_,
        'color': color,
        'height': data['height'],
        'weight': data['weight'],
        'hp': data['stats'][0]['base_stat'],
        'attack': data['stats'][1]['base_stat'],
        'defense': data['stats'][2]['base_stat'],
        'special-attack': data['stats'][3]['base_stat'],
        'special-defense': data['stats'][4]['base_stat'],
        'speed': data['stats'][5]['base_stat'],
        'image_url': f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{data['id']}.png",
        'bulbURL': f"https://bulbapedia.bulbagarden.net/wiki/{data['name'].capitalize()}_(Pokémon)"
    }
    return jsonify(pokemon_data)

if __name__ == '__main__':
    app.run(debug=True)
